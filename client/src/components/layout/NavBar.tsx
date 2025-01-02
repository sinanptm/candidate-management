import { memo } from "react";

const NavBar = () => {
    return (
        <header className="bg-blue-600 text-white p-4 shadow">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-semibold">Candidate Management</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <a href="/" className="hover:text-gray-200">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/admin" className="hover:text-gray-200">
                                Admin
                            </a>
                        </li>
                        <li>
                            <a href="/login" className="hover:text-gray-200">
                                Login
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>

    );
};

export default memo(NavBar);