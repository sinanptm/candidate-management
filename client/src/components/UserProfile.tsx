import { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IUser } from '@/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface UserProfileProps {
    user: IUser;
}

const UserProfile: FC<UserProfileProps> = ({ user }) => {
    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">User Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-center">
                    {user.profile ? (
                        <Avatar>
                            <AvatarImage src={user.profile} alt={user.name} />
                            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                    ) : (
                        <div className="w-[150px] h-[150px] bg-gray-200 rounded-full flex items-center justify-center">
                            <span className="text-4xl text-gray-500">
                                {user.name ? user.name[0].toUpperCase() : '?'}
                            </span>
                        </div>
                    )}
                </div>
                <div className="space-y-2">
                    <p><strong>Name:</strong> {user.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                    <p><strong>Mobile:</strong> {user.mobile || 'N/A'}</p>
                    <p><strong>Address:</strong> {user.address || 'N/A'}</p>
                </div>
                {user.resume && (
                    <div className="flex justify-center">
                        <Button asChild>
                            <a href={user.resume} target="_blank" rel="noopener noreferrer">
                                Open Resume
                            </a>
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default UserProfile

