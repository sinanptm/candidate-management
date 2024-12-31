import Authenticated from '@/lib/hoc/Authenticated';
import { UserRole } from '@/types';

const AdminHomePage = () => {
  return (
    <Authenticated role={UserRole.Admin}>
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <h1 className="text-2xl font-semibold">Admin Home Page</h1>
        </div>
    </Authenticated>
  )
}

export default AdminHomePage