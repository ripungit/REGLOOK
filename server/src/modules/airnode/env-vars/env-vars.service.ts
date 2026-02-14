import { Injectable } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { DrizzleService } from 'src/db/drizzle/drizzle.service';
import { environments, envVars } from 'src/db/drizzle/schema';

@Injectable()
export class EnvVarsService {
  constructor(private drizzleService: DrizzleService) {}

  async getEnvVars(environmentId: string, userId: string) {
    // Verify that environment belongs to user's project
    // This would require joining environments -> projects -> users
    // For now, we'll trust the environment ID is valid

    return await this.drizzleService.db
      .select({
        key: envVars.key,
        value: envVars.valueEncrypted, // In real implementation, this would be decrypted
        isSecret: envVars.isSecret,
      })
      .from(envVars)
      .where(eq(envVars.environmentId, environmentId));
  }

  async setEnvVar(environmentId: string, userId: string, key: string, value: string, isSecret: boolean = false) {
    // In a real implementation, we would encrypt the value
    // For now, storing as-is (in a real system, use encryption)

    // Check if variable already exists
    const existing = await this.drizzleService.db
      .select()
      .from(envVars)
      .where(
        and(
          eq(envVars.environmentId, environmentId),
          eq(envVars.key, key)
        )
      )
      .limit(1);

    if (existing.length > 0) {
      // Update existing
      await this.drizzleService.db
        .update(envVars)
        .set({
          valueEncrypted: value, // In real implementation, encrypt this
          isSecret,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(envVars.environmentId, environmentId),
            eq(envVars.key, key)
          )
        );
    } else {
      // Insert new
      await this.drizzleService.db.insert(envVars).values({
        environmentId,
        key,
        valueEncrypted: value, // In real implementation, encrypt this
        isSecret,
      });
    }
  }

  async deleteEnvVar(environmentId: string, userId: string, key: string) {
    await this.drizzleService.db
      .delete(envVars)
      .where(
        and(
          eq(envVars.environmentId, environmentId),
          eq(envVars.key, key)
        )
      );
  }
}