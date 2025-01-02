import Authenticated from "@/hoc/Authenticated";
import { getUserProfile } from "@/lib/api/candidate.api";
import { IUser, UserRole } from "@/types";
import { memo, useEffect, useState } from "react";
import UserProfile from "@/components/UserProfile";
import Loader from "@/components/Loader";

const HomePage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getUser = async () => {
    try {
      setLoading(true);
      const userData = await getUserProfile();
      setUser(userData);
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.message || "Failed to fetch user profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Authenticated role={UserRole.User}>

      <main className="container mx-auto py-10 px-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to the Candidate Dashboard
          </h2>
          <p className="text-gray-600 mb-6">
            Here you can view your profile and manage your account details.
          </p>

          {loading ? (
            <div className="py-10">
              <Loader />
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-600 font-semibold">Error: {error}</p>
            </div>
          ) : user ? (
            <div>
              <UserProfile setUser={setUser} user={user} />
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">No Profile data available.</p>
            </div>
          )}
        </div>
      </main>
    </Authenticated>
  );
};

export default memo(HomePage);
