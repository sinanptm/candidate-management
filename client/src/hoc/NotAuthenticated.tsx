import { memo, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../lib/utils";
import { NotAuthenticatedProps } from "@/types";

const NotAuthenticated = ({ children, role, redirectTo = "/" }: NotAuthenticatedProps) => {
  const navigate = useNavigate();
  const token = useMemo(() => getToken(role), [role]);

  useEffect(() => {
    if (token) {
      navigate(redirectTo);
    }
  }, [token, navigate, redirectTo]);

  if (token) {
    return <div>Redirecting...</div>;
  }

  return <>{children}</>;
};

export default memo(NotAuthenticated);
