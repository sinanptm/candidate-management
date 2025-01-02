'use client';

import { getCandidates } from '@/lib/api/admin.api';
import { IUser, UserRole } from '@/types';
import { memo, useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from '@/hooks/use-toast';
import CreateCandidateModal from '@/components/CreateCandidateModel';
import CandidateList from '@/components/CandidateList';
import Authenticated from '@/hoc/Authenticated';
import Loader from '@/components/Loader';


const AdminHomePage = () => {
  const [candidates, setCandidates] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetCandidates = useCallback(async () => {
    try {
      setLoading(true);
      const fetchedCandidates = await getCandidates();
      setCandidates(fetchedCandidates.users);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch candidates. Please refresh the page.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetCandidates();
  }, [handleGetCandidates]);

  const handleCandidateCreated = (newCandidate: IUser) => {
    setCandidates(prev => [...prev, newCandidate]);
  };

  return (
    <Authenticated role={UserRole.Admin}>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <div className="mb-6">
          <CreateCandidateModal onCandidateCreated={handleCandidateCreated} />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Candidates List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className='py-16'>
              <Loader />
              </div>
            ) : (
              <CandidateList setCandidates={setCandidates} candidates={candidates} />
            )}
          </CardContent>
        </Card>
      </div>
    </Authenticated>
  );
};

export default memo(AdminHomePage)

