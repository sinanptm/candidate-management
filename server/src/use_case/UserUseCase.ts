import { AWS_BUCKET_NAME, AWS_REGION } from "../config/env";
import { NotFoundError, ValidationError } from "../domain/entities/CustomErrors";
import IUser from "../domain/entities/IUser";
import IUserRepository from "../domain/interfaces/IUserRepository";
import ICloudService, { ContentType } from "../domain/interfaces/services/ICloudService";
import { UploadTypes } from "../types";

export default class UserUseCase {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly cloudService: ICloudService
    ) { }

    async createPresignedUrl(type: UploadTypes) {
        if (type !== UploadTypes.Profile && type !== UploadTypes.Resume) {
            throw new ValidationError('Invalid upload type');
        }

        let folder = '';
        let contentType = '';
        switch (type) {
            case UploadTypes.Profile:
                folder = `profile`;
                contentType = "image/jpeg";
                break;
            case UploadTypes.Resume:
                folder = `resume`;
                contentType = "application/pdf";
                break;
        }

        const fileKey = `${folder}/${Date.now()}`;

        const url = await this.cloudService.generatePreSignedUrl(AWS_BUCKET_NAME!, fileKey, contentType as ContentType);

        return { url, key: fileKey };
    }

    async updateFile(userId: string, key: string, type: UploadTypes) {
        let user = await this.validateFile(type, key, userId);
        let data: IUser = {};
        const url = `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${key}`;

        switch (type) {
            case UploadTypes.Profile:
                data = { profile: url };
                if (user.profile)
                    await this.cloudService.deleteFile(AWS_BUCKET_NAME!, user.profile?.split("amazonaws.com/").pop()!);
                break;

            case UploadTypes.Resume:
                data = { resume: url };
                if (user.resume)
                    await this.cloudService.deleteFile(AWS_BUCKET_NAME!, user.resume?.split("amazonaws.com/").pop()!);
                break;
        }

        user = await this.userRepository.update(userId, data) as IUser;
        return { user };
    }

    async getUserProfile(userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return { user };
    }

    async updateUserProfile(userId: string, data: IUser) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        const updatedUser = await this.userRepository.update(userId, data);
        return { user: updatedUser };
    }

    async validateFile(type: UploadTypes, key: string, userId: string): Promise<IUser> {
        if (type !== UploadTypes.Profile && type !== UploadTypes.Resume) {
            throw new ValidationError('Invalid upload type');
        }
        if (!key || key.trim().length === 0) {
            throw new ValidationError('Invalid file key');
        }
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new NotFoundError('User not found');
        }

        return user;
    }
}