import React from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar: React.FC = () => {
  const location = useLocation();

  // Логика определения активного элемента меню
  const selectedKey = (() => {
    if (location.pathname.startsWith("/admins")) return "1";
    if (location.pathname.startsWith("/workloads")) return "2";
    if (location.pathname.startsWith("/settings")) return "3";
    if (location.pathname.startsWith("/addadmin")) return "4";
    return "";
  })();

  return (
    <Menu
      style={{ width: 256, height: "100vh" }}
      mode="inline"
      theme="dark"
      selectedKeys={[selectedKey]}
    >
      <Menu.Item key="1">
        <NavLink to="/admins">Администраторы</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to="/workloads">Нагрузка</NavLink>
      </Menu.Item>
      <Menu.Item key="3">
        <NavLink to="/settings">Управление</NavLink>
      </Menu.Item>
      <Menu.Item key="4">
        <NavLink to="/addadmin">Добавить администратора</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default Sidebar;

