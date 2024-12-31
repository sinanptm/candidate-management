import { UserRole } from "@/types";
import { useMemo } from "react";
import { getToken } from "../utils";

const useGetToken = (role: UserRole) => {
    const token = useMemo(() => getToken(role), [role]);
    return token;
};

export default useGetToken;