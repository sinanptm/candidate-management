import { createPresignedUrl, updateFile, uploadFile } from '@/lib/api/candidate.api';
import { toast } from '@/hooks/use-toast';
import { UploadTypes } from '@/types';

export const useFileUpload = () => {
    const uploadResume = async (file: File) => {
        try {
            if (file.size > 10 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Please upload a file smaller than 10MB",
                    variant: "destructive"
                });
                return null;
            }

            if (file.type !== 'application/pdf') {
                toast({
                    title: "Invalid file type",
                    description: "Please upload a PDF File",
                    variant: "destructive"
                });
                return null;
            }
            const { key, url } = await createPresignedUrl(UploadTypes.Resume);
            if (!url || !key) {
                throw new Error('Failed to get presigned URL');
            }

            await uploadFile(file, url);

            const updatedUser = await updateFile(UploadTypes.Resume, key);

            toast({
                title: "Resume updated successfully"
            });

            return updatedUser;
        } catch (error: any) {
            const message = error.response.data.message || "unkown error occurred";
            console.error(error);
            toast({
                title: "Failed to update resume",
                description: message,
                variant: "destructive"
            });
            return null;
        }
    };

    const uploadProfileImage = async (file: File) => {
        try {
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: "File too large",
                    description: "Please upload an image smaller than 5MB",
                    variant: "destructive"
                });
                return null;
            }

            if (!file.type.startsWith('image/')) {
                toast({
                    title: "Invalid file type",
                    description: "Please upload an image file",
                    variant: "destructive"
                });
                return null;
            }

            const { key, url } = await createPresignedUrl(UploadTypes.Profile);
            if (!url || !key) {
                throw new Error('Failed to get presigned URL');
            }

            await uploadFile(file, url);
            const updatedUser = await updateFile(UploadTypes.Profile, key);

            if (!updatedUser) {
                throw new Error('Failed to update user record');
            }

            toast({
                title: "Profile image updated successfully"
            });

            return updatedUser;
        } catch (error: any) {
            const message = error.response.data.message || "unkown error occurred";
            console.error(error);
            toast({
                title: "Failed to update profile image",
                description: message,
                variant: "destructive"
            });
            return null;
        }
    };

    return { uploadResume, uploadProfileImage };
};
