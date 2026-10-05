import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import RoleSelectPage from "./pages/RoleSelectPage";
import DriverLoginPage from "./pages/driver/DriverLoginPage";
import DriverRegisterPage from "./pages/driver/DriverRegisterPage";
import DriverMainPage from "./pages/driver/DriverMainPage";
import EmployeeLoginPage from "./pages/employee/EmployeeLoginPage";
import EmployeeMainPage from "./pages/employee/EmployeeMainPage";
function RequireDriver({ children }: { children: ReactElement }) {
  const { driver } = useAuth();
  return driver ? children : <Navigate to="/driver/login" />;
}
function RequireEmployee({ children }: { children: ReactElement }) {
  const { employee } = useAuth();
  return employee ? children : <Navigate to="/employee/login" />;
}
export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelectPage />} />
          <Route path="/driver/login" element={<DriverLoginPage />} />
          <Route path="/driver/register" element={<DriverRegisterPage />} />
          <Route
            path="/driver/main"
            element={
              <RequireDriver>
                <DriverMainPage />
              </RequireDriver>
            }
          />
          <Route path="/employee/login" element={<EmployeeLoginPage />} />
          <Route
            path="/employee"
            element={
              <RequireEmployee>
                <EmployeeMainPage />
              </RequireEmployee>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}