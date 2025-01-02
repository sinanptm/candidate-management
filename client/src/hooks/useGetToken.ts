import { UserRole } from "@/types";
import { useMemo } from "react";
import { getToken } from "../lib/utils";

const useGetToken = (role: UserRole) => {
    const token = useMemo(() => getToken(role), [role]);
    return token;
};

export default useGetToken;