import LoginForm from "@/components/LoginForm";
import NotAuthenticated from "@/hoc/NotAuthenticated";
import { userLogin } from "@/lib/api/candidate.api";
import { UserRole } from "@/types";
import { memo, useCallback, useState } from "react";


const LoginPage = () => {
  const [error, setError] = useState<string | undefined>();
  const handleSubmit = useCallback(async (email: string, password: string) => {
    try {
      const { accessToken } = await userLogin(email, password);
      localStorage.setItem("user_token", accessToken);
      window.location.href = "/";
    } catch (error: any) {
      console.log(error);

      setError(error.response.data.message || "unknown error occurred");
    }
  }, []);
  return (
    <NotAuthenticated role={UserRole.User} redirectTo="/">
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <LoginForm error={error} setError={setError}  isAdmin={false} onSubmit={handleSubmit} />
        </div>
      </div>
    </NotAuthenticated>
  );
};

export default memo(LoginPage);