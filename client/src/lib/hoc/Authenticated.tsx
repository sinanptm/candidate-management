import { AuthenticatedProps } from "@/types";
import { getToken } from "../utils";
import { memo, useMemo } from "react";

const Authenticated = ({ children, role }: AuthenticatedProps) => {
  const token = useMemo(() => getToken(role), [role]);

  if (!token) {
    return <div>Not Authenticated</div>;
  }

  return <>{children}</>;
};

export default memo(Authenticated); 