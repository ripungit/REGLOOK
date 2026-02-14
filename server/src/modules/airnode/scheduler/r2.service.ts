import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class R2Service {
  private s3Client: S3Client;

  constructor(private configService: ConfigService) {
    const accountId = this.configService.get('R2_ACCOUNT_ID');
    const accessKeyId = this.configService.get('R2_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get('R2_SECRET_ACCESS_KEY');

    this.s3Client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId,
        secretAccessKey: secretAccessKey,
      },
      region: 'auto',
    });
  }

  async generatePresignedUrl(
    bucket: string,
    key: string,
    expiresIn: number = 3600,
    method: 'GET' | 'PUT' = 'GET',
    contentType?: string,
  ): Promise<{
    url: string;
    r2Key: string;
  }> {
    const command =
      method === 'PUT'
        ? new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          ContentType: contentType,
        })
        : new GetObjectCommand({ Bucket: bucket, Key: key });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn });

    return {
      url,
      r2Key: key,
    };
  }

  async generateArtifactPresignedUrl(
    projectId: string,
    deploymentId: string,
    sha256: string,
  ): Promise<{
    url: string;
    r2Key: string;
  }> {
    const bucket = this.configService.get('R2_BUCKET') || 'airnode';
    const r2Key = `artifacts/${projectId}/${deploymentId}/${sha256}.tar.gz`;
    return await this.generatePresignedUrl(bucket, r2Key);
  }

  async generateSourcePresignedGetUrl(
    r2Key: string,
    expiresIn: number = 1800,
  ): Promise<{
    url: string;
    r2Key: string;
  }> {
    const bucket = this.configService.get('R2_BUCKET') || 'airnode';
    return await this.generatePresignedUrl(bucket, r2Key, expiresIn, 'GET');
  }
}