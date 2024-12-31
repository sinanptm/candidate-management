import LoginForm from "@/components/LoginForm";
import { adminLogin } from "@/lib/api/admin.api";
import { memo, useCallback, useState } from "react";

const AdminLoginPage = () => {
  const [error, setError] = useState<string>();
  const handleSubmit = useCallback(async (email: string, password: string) => {
    try {
      const { accessToken } = await adminLogin(email, password);
      localStorage.setItem("admin_token", accessToken);
      window.location.href = "/admin"
    } catch (error: any) {
      setError(error.response.data.message);
    }
  }, []);
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm error={error} setError={setError} onSubmit={handleSubmit} isAdmin />
      </div>
    </div>
  );
};

export default memo(AdminLoginPage);