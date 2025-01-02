import { AuthenticatedProps } from "@/types";
import { getToken } from "../lib/utils";
import { memo, useMemo } from "react";

const Authenticated = ({ children, role }: AuthenticatedProps) => {
  const token = useMemo(() => getToken(role), [role]);

  if (!token) {
    return <div>Not Authenticated</div>;
  }

  return <section>{children}</section>;
};

export default memo(Authenticated); 