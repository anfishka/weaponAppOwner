import React, { useState } from "react";
import { Layout, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";

const { Header } = Layout;
const { Search } = Input;

// Тип для администратора
interface Admin {
  id: number;
  name: string;
  surname: string;
}

// Пример данных администраторов
const adminData: Admin[] = [
  { id: 1, name: "Иван", surname: "Иванов" },
  { id: 2, name: "Пётр", surname: "Петров" },
  { id: 3, name: "Сергей", surname: "Сергеев" },
  { id: 4, name: "Анна", surname: "Антонова" },
];

const AppHeader: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate(); 
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>(adminData);

  // Обработка ввода в строке поиска
  const handleSearch = (value: string) => {
    setSearchText(value);

    // Фильтруем администраторов
    const filtered = adminData.filter(
      (admin) =>
        admin.id.toString() === value || // Точный поиск по ID
      admin.name.toLowerCase().includes(value.toLowerCase()) || // Поиск по имени
      admin.surname.toLowerCase().includes(value.toLowerCase()) // Поиск по фамилии
    );
    if (filtered.length > 0) {
      // Если администратор найден, перенаправляем на его воркфлоу
      const selectedAdmin = filtered[0];
      navigate(`/workloads/${selectedAdmin.id}`, { state: selectedAdmin });
    } else {
      // Если ничего не найдено, показываем сообщение
      message.error("Администратор не найден");
    }
    setFilteredAdmins(filtered); // Обновляем отфильтрованные данные
  };

  return (
    <>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#BC4A00",
        }}
      >
        {/* Логотип или название */}
        <Link
          to="/"
          style={{
            color: "white",
            fontSize: "20px",
            fontWeight: "bold",
            backgroundColor: "#BC4A00",
          }}
        >
          Weapon - Owner Panel
        </Link>

        {/* Строка поиска */}
        <Search
          placeholder="Поиск администраторов (ID, Имя, Фамилия)"
          enterButton="Поиск"
          size="middle"
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)} // Обработка ввода
          onSearch={handleSearch} // Обработка кнопки "Поиск"
          style={{ maxWidth: 400 }}
        />
      </Header>

      {/* Отображение результатов поиска */}
      <div style={{ padding: "20px" }}>
        <h3>Результаты поиска:</h3>
        {filteredAdmins.length > 0 ? (
          <ul>
            {filteredAdmins.map((admin) => (
              <li key={admin.id}>
                ID: {admin.id}, Имя: {admin.name}, Фамилия: {admin.surname}
              </li>
            ))}
          </ul>
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    </>
  );
};

export default AppHeader;
