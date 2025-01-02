import  {IUser} from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useCallback } from "react";
import { deleteCandidate } from "@/lib/api/admin.api";
import { toast } from "@/hooks/use-toast";
import { CandidateDetailsModal } from "./CandidateDetailsModel";

type ListProps = {
  candidates: IUser[];
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setCandidates: Dispatch<SetStateAction<IUser[]>>;
};

const CandidateList = ({ candidates, setCandidates, setLoading, loading }: ListProps) => {
  const handleDeleteCandidate = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await deleteCandidate(id);
      setCandidates(prev => prev.filter(candidate => candidate._id !== id));
      toast({
        title: "Candidate Deleted",
        description: "The candidate has been successfully removed.",
      });
    } catch (error: any) {
      toast({
        title: "Failed to delete candidate.",
        description: error.response.data.message || "Unkown error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Mobile</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidates.map((candidate) => (
          <TableRow key={candidate._id}>
            <TableCell>{candidate.name}</TableCell>
            <TableCell>{candidate.email}</TableCell>
            <TableCell>{candidate.mobile}</TableCell>
            <TableCell className="space-x-2">
              <Button
                variant="destructive"
                onClick={() => candidate._id && handleDeleteCandidate(candidate._id)}
                disabled={loading}
              >
                Delete
              </Button>
              <CandidateDetailsModal candidate={candidate} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CandidateList;