import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deleteCandidate } from "@/lib/api/admin.api"
import { IUser } from "@/types"
import { toast } from '@/hooks/use-toast';

interface DeleteConfirmationModalProps {
  candidate: IUser
  onDelete: (id: string) => void
}

export function DeleteConfirmationModal({ candidate, onDelete }: DeleteConfirmationModalProps) {
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!candidate._id) return

    setIsDeleting(true)
    try {
      await deleteCandidate(candidate._id)
      onDelete(candidate._id)
      setOpen(false)
      toast({
        title: "Candidate Deleted",
        description: "The candidate has been successfully removed.",
      })
    } catch (error: any) {
      toast({
        title: "Failed to delete candidate",
        description: error.response?.data?.message || "Unknown error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" >Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the candidate {candidate.name}? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={isDeleting}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

