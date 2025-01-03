import { memo, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useGetToken from "@/hooks/useGetToken";
import { adminLogout } from "@/lib/api/admin.api";
import { userLogout } from "@/lib/api/candidate.api";
import { UserRole } from "@/types";
import { LogOut, Home, UserCog, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const adminToken = useGetToken(UserRole.Admin);
    const userToken = useGetToken(UserRole.User);
    const isAdminRoute = location.pathname.startsWith('/admin');

    const handleLogout = useCallback(async () => {
        try {
            if (isAdminRoute) {
                await adminLogout();
            } else {
                await userLogout();
            }
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }, [isAdminRoute, navigate]);

    const isAuthenticated = isAdminRoute ? adminToken : userToken;

    return (
        <header className="bg-blue-600 text-white p-4 shadow">
            <div className="container mx-auto flex justify-between items-center">
                <Link  to="/" ><h1 className="text-lg font-semibold">Candidate Management</h1></Link>
                <nav>
                    <ul className="flex items-center space-x-4">
                        {isAuthenticated && (
                            <li>
                                <Button
                                    variant="ghost"
                                    className="text-white hover:text-gray-200 hover:bg-blue-700"
                                    onClick={() => navigate('/')}
                                >
                                    <Home className="w-4 h-4 mr-2" />
                                    Home
                                </Button>
                            </li>
                        )}
                        
                        {userToken && !isAdminRoute && (
                            <li>
                                <Button
                                    variant="ghost"
                                    className="text-white hover:text-gray-200 hover:bg-blue-700"
                                    onClick={() => navigate('/admin')}
                                >
                                    <UserCog className="w-4 h-4 mr-2" />
                                    Admin
                                </Button>
                            </li>
                        )}

                        {!isAuthenticated ? (
                            <li>
                                <Button
                                    variant="ghost"
                                    className="text-white hover:text-gray-200 hover:bg-blue-700"
                                    onClick={() => navigate('/login')}
                                >
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Login
                                </Button>
                            </li>
                        ) : (
                            <li>
                                <Button
                                    variant="ghost"
                                    className="text-white hover:text-gray-200 hover:bg-blue-700"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="w-4 h-4 mr-2" />
                                    {isAdminRoute ? 'Admin Logout' : 'Logout'}
                                </Button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default memo(NavBar);