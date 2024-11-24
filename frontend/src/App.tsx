import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import LoginForm from "./components/LoginForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Sidebar from "./components/Sidebar";
import AdminsSection from "./components/AdminsSection";

import SettingsSection from "./components/SettingsSection";
import AddAdminSection from "./components/AddAdminSection";
import AdminsWorkloads from "./components/AdminsWorkloads";
import AppHeader from "./components/AppHeader";

const App: React.FC = () => {
  return (
 <BrowserRouter> 
        <AuthProvider>
        <Routes>
          {/* Страница логина */}
          <Route path="/login" element={<LoginForm />} />
          
          {/* Приложение с Sidebar */}
          <Route
            path="/*"
            element={
              <PrivateRoute>
                   <AppHeader>
                 
                   <Sidebar />
              
                  <div style={{ flex: 1, padding: 20 }}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/admins" element={<AdminsSection />} />
                      <Route path="/workloads/:id" element={<AdminsWorkloads />} />
                      <Route path="/settings/:id" element={<SettingsSection />} />
                      <Route path="/addadmin" element={<AddAdminSection />} />
                    </Routes>
                  </div>
                </AppHeader>
              </PrivateRoute>
            }
          />
        </Routes>
    </AuthProvider>  
    </BrowserRouter>
  );
};

export default App;

