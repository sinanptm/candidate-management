import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const LoginPage = lazy(() => import('./pages/user/LoginPage'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage')); 
const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'));

const LoadingFallback = () => <div>Loading...</div>;

const App = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminHomePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;
