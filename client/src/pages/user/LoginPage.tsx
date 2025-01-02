import LoginForm from "@/components/LoginForm";
import { memo, useCallback, useState } from "react";


const LoginPage = () => {
  const [error, setError] = useState<string | undefined>();
  const handleSubmit = useCallback(async (email: string, password: string) => {
    
  }, []);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm error={error} setError={setError} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default memo(LoginPage);