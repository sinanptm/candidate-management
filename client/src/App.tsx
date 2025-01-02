import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import NavBar from "./components/layout/NavBar";

const LoginPage = lazy(() => import('./pages/user/LoginPage'));
const HomePage = lazy(() => import("./pages/user/HomePage"));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'));

const LoadingFallback = () => <div>Loading...</div>;

const App = () => {
  return (
    <section className="min-h-screen">
    <Suspense fallback={<LoadingFallback />}>
      <NavBar />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminHomePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
    </section>
  );
};

export default App;
