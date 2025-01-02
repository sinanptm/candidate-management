import { AuthenticatedProps } from "@/types";
import { getToken } from "../lib/utils";
import { memo, useMemo } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";

const Authenticated = ({ children, role }: AuthenticatedProps) => {
  const token = useMemo(() => getToken(role), [role]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Alert variant="destructive" className="max-w-md">
          {role === 'admin' ? (
            <ShieldAlert className="h-4 w-4" />
          ) : (
            <UserX className="h-4 w-4" />
          )}
          <AlertTitle>Authentication Required</AlertTitle>
          <AlertDescription>
            {role === 'admin' 
              ? "You need admin privileges to access this page." 
              : "You need to be logged in to access this page."}
          </AlertDescription>
          <div className="mt-4">
            <Button asChild>
              <a href={role === 'admin' ? "/admin/login" : "/login"}>
                {role === 'admin' ? "Admin Login" : "Login"}
              </a>
            </Button>
          </div>
        </Alert>
      </div>
    );
  }

  return <section>{children}</section>;
};

export default memo(Authenticated); 