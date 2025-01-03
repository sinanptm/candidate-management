
import { memo, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { IUser } from '@/types';
import { useFileUpload } from '@/hooks/useFileUpload';

interface ProfileImageProps {
    user: IUser;
    onProfileUpdate: () => void;
}

const ProfileImage = ({ user, onProfileUpdate }: ProfileImageProps) => {
    const profileInputRef = useRef<HTMLInputElement>(null);
    const { uploadProfileImage } = useFileUpload();

    const handleUpdateProfileImage = async (file: File) => {
        await uploadProfileImage(file);
        onProfileUpdate();
    };

    const triggerFileInput = () => {
        profileInputRef.current?.click();
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
                <AvatarImage src={user.profile} alt={user.name} key={user.profile || 'default'} />
                <AvatarFallback className="text-4xl">{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <Input
                    ref={profileInputRef}
                    id="profile-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => e.target.files && handleUpdateProfileImage(e.target.files[0])}
                    accept="image/*"
                />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={triggerFileInput}
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Update Profile Image
                </Button>
            </div>
        </div>
    );
};

export default memo(ProfileImage);