import { Dispatch, FC, SetStateAction, useCallback } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IUser } from '@/types';
import { Label } from '@/components/ui/label';
import ProfileImage from './ProfileImage';
import ResumeUpload from './ResumeUpload';
import UpdateUserProfile from './UpdateUserProfile';
import { getUserProfile, updateUserProfile } from '@/lib/api/candidate.api';
import { useState } from 'react';

interface UserProfileProps {
    user: IUser;
    setUser: Dispatch<SetStateAction<IUser | null>>;
}

const UserProfile: FC<UserProfileProps> = ({ user, setUser }) => {
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

    const updateUser = async (updatedUser: IUser) => {
        await updateUserProfile(updatedUser);
        setUser(updatedUser);
    };

    const onUpdateFile = useCallback(async () => {
        try {
            const user = await getUserProfile();
            setUser(user);
        } catch (error) {
            console.log(error);
        }
    }, [setUser]);

    return (
        <Card className="w-full border-none max-w-2xl mx-auto">
            <CardHeader />
            <CardContent className="space-y-6">
                <ProfileImage user={user} onProfileUpdate={onUpdateFile} />

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Name</Label>
                        <p className="font-medium">{user.name || 'N/A'}</p>
                    </div>
                    <div>
                        <Label>Email</Label>
                        <p className="font-medium">{user.email || 'N/A'}</p>
                    </div>
                    <div>
                        <Label>Mobile</Label>
                        <p className="font-medium">{user.mobile || 'N/A'}</p>
                    </div>
                    <div>
                        <Label>Address</Label>
                        <p className="font-medium">{user.address || 'N/A'}</p>
                    </div>
                </div>

                <ResumeUpload user={user} onResumeUpdate={onUpdateFile} />

                <UpdateUserProfile
                    open={isUpdateDialogOpen}
                    setOpen={setIsUpdateDialogOpen}
                    updateUser={updateUser}
                    user={user}
                    setUser={setUser}
                />
            </CardContent>
        </Card>
    );
};

export default UserProfile;
