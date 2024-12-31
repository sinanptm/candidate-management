import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, memo, SetStateAction, useState } from "react";

type Props = {
  onSubmit: (email: string, password: string) => Promise<void>;
  isAdmin?: boolean;
  error: string | undefined;
  setError: Dispatch<SetStateAction<string | undefined>>;
};

const LoginForm = ({ onSubmit, isAdmin, error, setError }: Props) => {
  const [email, setEmail] = useState<string | null>();
  const [password, setPassword] = useState<string | null>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email?.trim() || !password?.trim()) {
        return setError("Please fill in all fields");
      }
      await onSubmit(email, password);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">
            {isAdmin ? "Welcome Admin" : "Welcome Back"}
          </CardTitle>
          <CardDescription>
            {isAdmin
              ? "Login to the admin dashboard to continue"
              : "Login to your account to continue"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <span className="text-red-500 text-sm">{error}</span>
                )}
                <Button type="submit" className="w-full">
                  {isAdmin ? "Login as Admin" : "Login"}
                </Button>
              </div>
              {!isAdmin ? (
                <div className="text-center text-sm">
                  Admin?{" "}
                  <a
                    href="/admin/login"
                    className="underline underline-offset-4"
                  >
                    Login here
                  </a>
                </div>
              ) : (
                <div className="text-center text-sm">
                  Not an Admin?{" "}
                  <a
                    href="/login"
                    className="underline underline-offset-4"
                  >
                    Login here
                  </a>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(LoginForm);
