import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { eq, and, lt } from 'drizzle-orm';
import { DrizzleService } from 'src/db/drizzle/drizzle.service';
import { cliDeviceCodes, apiTokens, sessions, users } from 'src/db/drizzle/schema';
import { generateRandomString } from 'src/common/utils/strings.util';
import { TokenService } from 'src/platform/auth/services/token.service';
import { v4 as uuidv4 } from 'uuid';
import { addSeconds } from 'date-fns';

@Injectable()
export class CliAuthService {
  constructor(
    private drizzleService: DrizzleService,
    private configService: ConfigService,
    private tokenService: TokenService,
  ) { }

  async startDeviceFlow(): Promise<{
    deviceCode: string;
    userCode: string;
    verificationUri: string;
    expiresAt: Date;
    intervalSeconds: number;
  }> {
    // Generate codes
    const deviceCode = generateRandomString(16).toUpperCase();
    const userCode = generateRandomString(8).toUpperCase().match(/.{1,4}/g)?.join('-') || '';

    // Set expiration (5 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Create device code record
    await this.drizzleService.db.insert(cliDeviceCodes).values({
      deviceCode,
      userCode,
      status: 'pending',
      expiresAt,
      intervalSeconds: 2,
    });

    return {
      deviceCode,
      userCode,
      verificationUri: `${this.configService.get('RP_ORIGIN')}/cli/auth/device/verify?user_code=${userCode}`,
      expiresAt,
      intervalSeconds: 2,
    };
  }

  async pollDeviceFlow(deviceCode: string): Promise<{ status: 'pending' | 'approved'; accessToken?: string }> {
    // Clean up expired device codes
    await this.drizzleService.db
      .delete(cliDeviceCodes)
      .where(lt(cliDeviceCodes.expiresAt, new Date()));

    // Find the device code
    const deviceCodeRecord = await this.drizzleService.db
      .select()
      .from(cliDeviceCodes)
      .where(eq(cliDeviceCodes.deviceCode, deviceCode))
      .limit(1);

    if (deviceCodeRecord.length === 0) {
      throw new Error('Device code not found');
    }

    const record = deviceCodeRecord[0];

    if (record.status === 'pending') {
      return { status: 'pending' };
    }

    if (record.status === 'approved' && record.userId) {
      // Generate new API token
      const token = generateRandomString(32);
      const tokenHash = await this.tokenService.hashToken(token);

      await this.drizzleService.db.insert(apiTokens).values({
        userId: record.userId,
        tokenHash,
        label: `CLI Device Token - ${new Date().toISOString()}`,
        createdAt: new Date(),
      });

      // Mark device code as consumed
      await this.drizzleService.db
        .update(cliDeviceCodes)
        .set({ status: 'consumed' }) // Assuming we have a consumed status
        .where(eq(cliDeviceCodes.deviceCode, deviceCode));

      return { status: 'approved', accessToken: token };
    }

    throw new Error('Invalid device code status');
  }

  async approveDevice(userCode: string, username: string): Promise<void> {
    // Clean up expired device codes
    await this.drizzleService.db
      .delete(cliDeviceCodes)
      .where(lt(cliDeviceCodes.expiresAt, new Date()));

    // Find the device code
    const deviceCodeRecord = await this.drizzleService.db
      .select()
      .from(cliDeviceCodes)
      .where(and(
        eq(cliDeviceCodes.userCode, userCode),
        eq(cliDeviceCodes.status, 'pending')
      ))
      .limit(1);

    if (deviceCodeRecord.length === 0) {
      throw new Error('Device code not found or already used');
    }

    // Find user in main users table
    const user = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.username, username.toLowerCase()))
      .limit(1);

    if (user.length === 0) {
      throw new Error('User not found. Please sign up first.');
    }

    const userId = user[0].id;

    // Update device code to approved
    await this.drizzleService.db
      .update(cliDeviceCodes)
      .set({
        status: 'approved',
        userId,
        expiresAt: new Date(), // Expire immediately after approval
      })
      .where(eq(cliDeviceCodes.userCode, userCode));
  }

  async getUserByCode(userCode: string) {
    // Clean up expired device codes
    await this.drizzleService.db
      .delete(cliDeviceCodes)
      .where(lt(cliDeviceCodes.expiresAt, new Date()));

    // Find the device code
    const deviceCodeRecord = await this.drizzleService.db
      .select()
      .from(cliDeviceCodes)
      .where(and(
        eq(cliDeviceCodes.userCode, userCode),
        eq(cliDeviceCodes.status, 'approved')
      ))
      .limit(1);

    if (deviceCodeRecord.length === 0) {
      throw new Error('Invalid or expired user code');
    }

    const record = deviceCodeRecord[0];
    if (!record.userId) {
      throw new Error('User not found');
    }

    // Get user data from main users table
    const user = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.id, record.userId))
      .limit(1);

    if (user.length === 0) {
      throw new Error('User not found');
    }

    return {
      id: user[0].id,
      email: user[0].email,
      username: user[0].username,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      role: user[0].role,
      marketingOptIn: user[0].marketingOptIn,
      createdAt: user[0].createdAt.toISOString(),
      updatedAt: user[0].updatedAt.toISOString(),
    };
  }

  async createSession(userId: string): Promise<string> {
    const sessionId = uuidv4();
    const sessionTtlSeconds = parseInt(process.env.SESSION_TTL_SECONDS || '604800', 10); // Default to 7 days
    const expiresAt = addSeconds(new Date(), sessionTtlSeconds);

    await this.drizzleService.db.insert(sessions).values({
      id: sessionId,
      userId,
      expiresAt,
      ip: null, // CLI doesn't have IP context
      userAgent: 'CLI Client',
    });

    return sessionId;
  }

  async generateUserCode(username: string, authenticatedUserId: string) {
    // First, verify that the authenticated user has permission to generate code for this username
    // For now, we'll verify the user exists in the main users table
    const user = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.username, username.toLowerCase()))
      .limit(1);

    if (user.length === 0) {
      throw new Error('User not found');
    }

    // Generate a user-specific code
    const userCode = `${username.toUpperCase().substring(0, 4)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Set expiration (5 minutes from now)
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);

    // Create device code record with user association
    await this.drizzleService.db.insert(cliDeviceCodes).values({
      deviceCode: generateRandomString(16).toUpperCase(),
      userCode,
      status: 'approved', // Pre-approved for this user
      userId: user[0].id, // Associate with the target user
      expiresAt,
      intervalSeconds: 2,
    });

    return {
      userCode,
      expiresAt,
      message: `User code generated for ${username}`
    };
  }

  async generateCliToken(userId: string): Promise<string> {
    // Ensure user exists in main users table
    const existingUser = await this.drizzleService.db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (existingUser.length === 0) {
      throw new Error('User not found');
    }

    // Generate a random token
    const token = generateRandomString(32);
    const tokenHash = await this.tokenService.hashToken(token);

    // Store the token in the apiTokens table
    await this.drizzleService.db.insert(apiTokens).values({
      userId,
      tokenHash,
      label: `CLI Token - ${new Date().toISOString()}`,
      createdAt: new Date(),
    });

    return token;
  }

  async getUserById(userId: string) {
    // Get user from the main users table
    const result = await this.drizzleService.db
      .select({
        id: users.id,
        username: users.username,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (result.length === 0) {
      throw new Error('User not found');
    }

    return result[0];
  }
}