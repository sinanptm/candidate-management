import { memo, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Loader2 } from 'lucide-react';
import { IUser } from '@/types';
import { useFileUpload } from '@/hooks/useFileUpload';

interface ResumeUploadProps {
    user: IUser;
    onResumeUpdate: () => void;
}

const ResumeUpload = ({ user, onResumeUpdate }: ResumeUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const resumeInputRef = useRef<HTMLInputElement>(null);
    const { uploadResume } = useFileUpload();

    const handleUploadResume = async (file: File) => {
        if (!file) return;
        
        setIsUploading(true);
        try {
            await uploadResume(file);
             onResumeUpdate()
        } finally {
            setIsUploading(false);
        }
    };

    const triggerFileInput = () => {
        resumeInputRef.current?.click();
    };

    return (
        <div className="space-y-2">
            <Label>Resume</Label>
            <div className="flex items-center space-x-2">
                {user.resume && (
                    <Button asChild variant="outline">
                        <a href={user.resume} target="_blank" rel="noopener noreferrer">
                            <FileText className="w-4 h-4 mr-2" />
                            View Resume
                        </a>
                    </Button>
                )}
                <Input
                    ref={resumeInputRef}
                    id="resume-upload"
                    type="file"
                    className="hidden"
                    onChange={(e) => e.target.files && handleUploadResume(e.target.files[0])}
                    accept=".pdf,.doc,.docx"
                />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={triggerFileInput}
                    disabled={isUploading}
                >
                    {isUploading ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Upload className="w-4 h-4 mr-2" />
                    )}
                    {isUploading 
                        ? 'Uploading...' 
                        : user.resume 
                            ? 'Update Resume' 
                            : 'Upload Resume'
                    }
                </Button>
            </div>
        </div>
    );
};

export default memo(ResumeUpload);