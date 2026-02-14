import { Controller, Post, Get, Body, Query, HttpCode, HttpStatus, UseGuards, Req, Param, Res, Inject } from '@nestjs/common';
import { ApiCookieAuth, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CliAuthService } from './cli-auth.service';
import { DevicePollDto } from './dto/device-poll.dto';
import { DeviceApproveDto } from './dto/device-approve.dto';
import { SessionGuard } from 'src/platform/http/guards/session.guard';
import { BearerAuthGuard } from 'src/platform/auth/guards/bearer-auth.guard';
import { CookieService } from 'src/platform/security/cookies/cookie.service';

@Controller('cli/auth/device')
export class CliAuthController {
  constructor(
    private cliAuthService: CliAuthService,
    private cookieService: CookieService,
  ) { }

  @Post('start')
  async startDeviceFlow() {
    return await this.cliAuthService.startDeviceFlow();
  }

  @Post('poll')
  @HttpCode(HttpStatus.OK)
  async pollDeviceFlow(@Body() body: DevicePollDto) {
    return await this.cliAuthService.pollDeviceFlow(body.deviceCode);
  }

  @Get('verify')
  async verifyDevice(@Query('user_code') userCode: string) {
    // Return simple HTML for user verification
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Device Verification</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; text-align: center; }
          .container { max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
          button { background-color: #007bff; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer; }
          button:hover { background-color: #0056b3; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Confirm Device Access</h2>
          <p>Your device is requesting access with code:</p>
          <h3>${userCode}</h3>
          <p>Please confirm this code matches what's shown on your device.</p>
          <form method="post" action="/cli/auth/device/approve">
            <input type="hidden" name="userCode" value="${userCode}" />
            <label for="username">Enter your username:</label><br><br>
            <input type="text" id="username" name="username" required /><br><br>
            <button type="submit">Approve Device</button>
          </form>
        </div>
      </body>
      </html>
    `;
  }

  @Post('approve')
  async approveDevice(@Body() body: DeviceApproveDto) {
    await this.cliAuthService.approveDevice(body.userCode, body.username);
    return { message: 'Device approved successfully' };
  }

  @Get('whoami')
  @UseGuards(BearerAuthGuard)
  @ApiBearerAuth()
  async whoami(@Req() req: Request) {
    const user = (req as any).user;

    return {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      marketingOptIn: user.marketingOptIn,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Get('user/:userCode')
  async getUserByCode(@Param('userCode') userCode: string) {
    return await this.cliAuthService.getUserByCode(userCode);
  }

  @Post('login-with-code')
  async loginWithCode(
    @Body() body: { userCode: string },
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.cliAuthService.getUserByCode(body.userCode);

    // Generate a temporary API token for CLI use
    const token = await this.cliAuthService.generateCliToken(user.id);

    return { message: 'Logged in successfully', user, token };
  }

  @Post('generate-user-code')
  @UseGuards(SessionGuard)  // Use SessionGuard instead of BearerAuthGuard
  @ApiCookieAuth()  // Document that this endpoint requires cookie auth
  async generateUserCode(@Req() req: Request, @Body() body: { username: string }) {
    const authenticatedUserId = (req as any).user.id;
    return await this.cliAuthService.generateUserCode(body.username, authenticatedUserId);
  }
}