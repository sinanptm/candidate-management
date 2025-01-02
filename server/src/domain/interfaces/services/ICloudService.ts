export type ContentType = "image/jpeg" | "application/pdf";

export default interface ICloudService {
    generatePreSignedUrl(bucket: string, key: string, contentType: ContentType, expiresIn?: number): Promise<string>;
    deleteFile(bucket: string, key: string): Promise<void>;
}