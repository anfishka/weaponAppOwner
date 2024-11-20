import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const selectedKey = location.pathname.includes("/workloads")
    ? "2"
    : location.pathname.includes("/admins")
    ? "1"
    : location.pathname.includes("/settings")
    ? "3"
    : "";

  return (
    <Menu style={{ width: 256, height: "100vh" }} mode="inline" theme="dark" selectedKeys={[selectedKey]}>
    <Menu.Item key="1">
      <NavLink to="/admins">Администраторы</NavLink>
    </Menu.Item>
    <Menu.Item key="2">
      <NavLink to="/workloads/:id">Нагрузка</NavLink>
    </Menu.Item>
    <Menu.Item key="3">
      <NavLink to="/settings">Управление</NavLink>
    </Menu.Item>
  </Menu>
  );
};

export default Sidebar;
