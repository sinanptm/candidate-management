'use client';

import { useState, FormEvent, ChangeEvent, Dispatch, SetStateAction, memo, useCallback } from "react";
import { IUser } from "@/types";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    updateUser: (user: Partial<IUser>) => void;
    user: IUser;
    setUser:Dispatch<SetStateAction<IUser | null>>;
};

const UpdateUserProfile = ({ open, setOpen, updateUser, user, setUser }: Props) => {
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email || '',
        mobile: user.mobile || '',
        address: user.address || '',
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        main: ""
    });

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    },[errors]);

    const validateForm = useCallback(() => {
        let isValid = true;
        const newErrors = { name: '', email: '' };

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
            isValid = false;
        }

        setErrors({ ...errors, ...newErrors });
        return isValid;
    },[errors, formData]);

    const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            if (validateForm()) {
                setUser(prev => ({ ...prev!, ...formData }));
                updateUser(formData);
                setOpen(false);
            }
        } catch (error: any) {
            const message = error.response.data.message || "Unknown error occurred";
            setErrors(prev => ({ ...prev, main: message }));
        }
    },[formData, errors, setOpen, setUser, updateUser, validateForm]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Update Details ✏️</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Profile Details</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile</Label>
                        <Input
                            id="mobile"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    {errors.main && <p className="text-sm text-red-500">{errors.main}</p>}
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default memo(UpdateUserProfile)

