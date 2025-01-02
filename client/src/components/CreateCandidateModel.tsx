'use client';

import { FormEvent, memo, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createCandidate } from '@/lib/api/admin.api';
import IUser from '@/types';
import { toast } from '@/hooks/use-toast';

interface CreateCandidateProps {
  onCandidateCreated: (candidate: IUser) => void;
}

const CreateCandidateModal = ({ onCandidateCreated }: CreateCandidateProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newCandidate, setNewCandidate] = useState<Partial<IUser>>({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Partial<Record<keyof IUser | 'confirmPassword', string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof IUser | 'confirmPassword', string>> = {};

    if (!newCandidate.name) newErrors.name = 'Name is required';
    if (!newCandidate.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(newCandidate.email)) newErrors.email = 'Email is invalid';
    if (!newCandidate.password) newErrors.password = 'Password is required';
    else if (newCandidate.password.trim().length < 4) newErrors.password = 'Password must be at least 4 characters';
    if (newCandidate.password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateCandidate = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await createCandidate(newCandidate);
      onCandidateCreated(response.user);
      setNewCandidate({});
      setConfirmPassword('');
      setOpen(false);
      toast({
        title: "Candidate Created",
        description: "New candidate has been successfully added.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to create candidate.",
        description: error.response.data.message || "Unknown error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCandidate(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create New Candidate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Candidate</DialogTitle>
          <DialogDescription>Fill in the details to create a new candidate.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreateCandidate} className="space-y-4">
          <div>
            <Input
              name="name"
              placeholder="Name"
              value={newCandidate.name || ''}
              onChange={handleInputChange}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={newCandidate.email || ''}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <Input
              name="mobile"
              placeholder="Mobile"
              value={newCandidate.mobile || ''}
              onChange={handleInputChange}
            />
            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
          </div>
          <div>
            <Input
              name="password"
              placeholder="Password"
              type='password'
              value={newCandidate.password || ''}
              onChange={handleInputChange}
              required
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <Input
              name="confirmPassword"
              placeholder="Confirm Password"
              type='password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors(prev => ({ ...prev, confirmPassword: '' }));
              }}
              required
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Candidate'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default memo(CreateCandidateModal);

