'use client'

import { getCandidates, deleteCandidate } from '@/lib/api/admin.api'
import Authenticated from '@/hoc/Authenticated'
import IUser, { UserRole } from '@/types'
import { memo, useCallback, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from '@/hooks/use-toast'
import CreateCandidateModal  from '@/components/CreateCandidateModel';


const AdminHomePage = () => {
  const [candidates, setCandidates] = useState<IUser[]>([])
  const [loading, setLoading] = useState(true)

  const handleDeleteCandidate = useCallback(async (id: string) => {
    try {
      setLoading(true)
      await deleteCandidate(id)
      setCandidates(prev => prev.filter(candidate => candidate._id !== id))
      toast({
        title: "Candidate Deleted",
        description: "The candidate has been successfully removed.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete candidate. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  const handleGetCandidates = useCallback(async () => {
    try {
      setLoading(true)
      const fetchedCandidates = await getCandidates()
      setCandidates(fetchedCandidates.users)      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch candidates. Please refresh the page.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    handleGetCandidates()
  }, [handleGetCandidates])

  const handleCandidateCreated = (newCandidate: IUser) => {
    setCandidates(prev => [...prev, newCandidate])
  }

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
              <p>Loading candidates...</p>
            ) : (
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
                      <TableCell>
                        <Button 
                          variant="destructive" 
                          onClick={() => candidate._id && handleDeleteCandidate(candidate._id)}
                          disabled={loading}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Authenticated>
  )
}

export default  memo(AdminHomePage)

