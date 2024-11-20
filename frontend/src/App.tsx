import React from "react";
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./layouts/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import Sidebar from "./components/Sidebar"
import AdminsSection from "./components/AdminsSection";
import WorkloadsSection from "./components/WorkloadsSection";
import SettingsSection from "./components/SettingsSection";
import AppHeader from "./components/AppHeader";
import Home from "./components/Home";


const App: React.FC = () => ( 
  <AuthProvider>
  <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        {/* Header — фиксированная шапка */}
           {/* Header */}
           <AppHeader />
        <div style={{ display: "flex", flex: 1 }}>
          {/* Sidebar слева */}
          <Sidebar />

          {/* Контент справа от Sidebar */}
          <div style={{ marginLeft: 256, padding: 20, width: "100%" }}>
            <main>
              <Routes>
                {/* Главная страница */}
                <Route path="/" element={<Home />} />
                <Route path="/admins" element={<AdminsSection />} />
                {/* Страница с нагрузкой администраторов */}
                <Route path="/workloads/:id" element={<WorkloadsSection />} />
                {/* Страница настроек */}
                <Route path="/settings" element={<SettingsSection />} />
              </Routes>
            </main>
          </div>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
</AuthProvider> 
);


export default App;
