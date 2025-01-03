import { IUser } from "@/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dispatch, memo, SetStateAction, useCallback } from "react";
import { CandidateDetailsModal } from "./CandidateDetailsModel";
import { DeleteConfirmationModal } from "./DeleteCandidateModel";

type ListProps = {
  candidates: IUser[];
  setCandidates: Dispatch<SetStateAction<IUser[]>>;
};

const CandidateList = ({ candidates, setCandidates }: ListProps) => {
  const handleDeleteCandidate = useCallback(async (id: string) => {
    setCandidates(prev => prev.filter(candidate => candidate._id !== id));
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
              <DeleteConfirmationModal
                candidate={candidate}
                onDelete={handleDeleteCandidate}
              />
              <CandidateDetailsModal candidate={candidate} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default memo(CandidateList);