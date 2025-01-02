'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {IUser} from "@/types";

interface CandidateDetailsModalProps {
    candidate: IUser;
}

export function CandidateDetailsModal({ candidate }: CandidateDetailsModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">View</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogDescription />
                <DialogHeader>
                    <DialogTitle>Candidate Details</DialogTitle>
                </DialogHeader>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={candidate.profile} alt={candidate.name} />
                                <AvatarFallback>{candidate.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {candidate.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><strong>Email:</strong> {candidate.email}</p>
                        <p><strong>Mobile:</strong> {candidate.mobile || 'N/A'}</p>
                        <p><strong>Address:</strong> {candidate.address || 'N/A'}</p>
                        {candidate.resume && (
                            <p>
                                <strong>Resume:</strong>{' '}
                                <a href={candidate.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    View Resume
                                </a>
                            </p>
                        )}
                    </CardContent>
                </Card>
            </DialogContent>
        </Dialog>
    );
}

