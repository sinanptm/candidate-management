import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_ACCESS_KEY } from "../../config/env";
import ICloudService, { ContentType } from "../../domain/interfaces/services/ICloudService";


export default class CloudService implements ICloudService {
    private s3: S3Client;

    constructor() {
        this.s3 = new S3Client({
            region: AWS_REGION,
            credentials: {
                accessKeyId: AWS_ACCESS_KEY_ID!,
                secretAccessKey: AWS_SECRET_ACCESS_KEY!,
            },
        });
    }

    async generatePreSignedUrl(bucket: string, key: string, contentType: ContentType, expiresIn: number = 30): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            ContentType: contentType,
        });
        const url = await getSignedUrl(this.s3, command, { expiresIn });
        return url;
    }

    async deleteFile(bucket: string, key: string): Promise<void> {
        if (!key) return;
        const command = new DeleteObjectCommand({
            Bucket: bucket,
            Key: key,
        });
        await this.s3.send(command);
    }
}