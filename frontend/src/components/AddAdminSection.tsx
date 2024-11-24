import React, { useState } from "react";
import axios from "axios";
import { Switch } from "antd";

const apiUrl = process.env.REACT_APP_API_URL;


interface Admin {
  id?: number;
  username: string;
  password: string;
  is_active: boolean;
  email: string;
  first_name: string;
  last_name: string;
}

const AddAdminSection: React.FC = () => {
  const [admin, setAdmin] = useState<Admin>({
    username: "",
    password: "",
    is_active: true,
    email: "",
    first_name: "",
    last_name: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};
  
    // Проверка имени
    if (!admin.first_name.trim()) {
      newErrors.first_name = "Имя обязательно.";
    } else if (admin.first_name.trim().length < 3) {
      newErrors.first_name = "Имя должно быть больше 2 символов.";
    } else if (!/^[A-ZА-Я]/.test(admin.first_name.trim())) {
      newErrors.first_name = "Имя должно начинаться с заглавной буквы.";
    }
  
    // Проверка фамилии
    if (!admin.last_name.trim()) {
      newErrors.last_name = "Фамилия обязательна.";
    } else if (admin.last_name.trim().length < 3) {
      newErrors.last_name = "Фамилия должна быть больше 2 символов.";
    } else if (!/^[A-ZА-Я]/.test(admin.last_name.trim())) {
      newErrors.last_name = "Фамилия должна начинаться с заглавной буквы.";
    }
  
    // Проверка логина
    if (!admin.username.trim()) {
      newErrors.username = "Логин обязателен.";
    } else if (admin.username.trim().length < 4) {
      newErrors.username = "Логин должен быть больше 3 символов.";
    }
  
    // Проверка пароля
    if (!admin.password.trim()) {
      newErrors.password = "Пароль обязателен.";
    } else if (admin.password.trim().length < 3) {
      newErrors.password = "Пароль должен быть больше 3 символов.";
    }
  
    // Проверка email
    if (!admin.email.trim()) {
      newErrors.email = "Email обязателен.";
    } else if (!/\S+@\S+\.\S+/.test(admin.email)) {
      newErrors.email = "Введите корректный email.";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setAdmin({
      ...admin,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setMessage(null); // Очистка общего сообщения, если есть ошибки
      return;
    }

    setLoading(true);
    setMessage(null); // Очистка предыдущего сообщения
    try {
      const response = await axios.post(`${apiUrl}/api/admins`, admin);
      
      console.log(response)
      setMessage(`Администратор успешно добавлен! `);
      setAdmin({
        username: "",
        password: "",
        is_active: true,
        email: "",
        first_name: "",
        last_name: "",
      });
    } catch (error: any) {
        
      console.error("Ошибка при добавлении администратора:", error);
      if (error.response) {
        setMessage(`Ошибка: ${error.response.data}`);
      } else {
        setMessage("Ошибка при добавлении администратора.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-section">
      <h1>Добавить администратора</h1>
      {message && <p>{message}</p>}
      {loading && <p>Загрузка...</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            name="first_name"
            value={admin.first_name}
            onChange={handleChange}
            required
          />
          {errors.first_name && <p className="error">{errors.first_name}</p>}
        </div>
        <div>
          <label>Фамилия:</label>
          <input
            type="text"
            name="last_name"
            value={admin.last_name}
            onChange={handleChange}
            required
          />
          {errors.last_name && <p className="error">{errors.last_name}</p>}
        </div>
        <div>
          <label>Логин:</label>
          <input
            type="text"
            name="username"
            value={admin.username}
            onChange={handleChange}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>
        <div>
          <label>Пароль:</label>
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
  <label>Активен:</label>
  <Switch
    checked={admin.is_active}
    onChange={(checked) =>
      setAdmin({ ...admin, is_active: checked })
    }
    checkedChildren="Активен"
    unCheckedChildren="Неактивен"
    style={{
      backgroundColor: admin.is_active ? "rgb(0, 100, 80)" : "rgb(0, 21, 41)",
      cursor: "pointer",
      width:"150px",
     textAlign:'center',
      padding:"1px"
    }}
  />
</div>

        <button type="submit" disabled={loading}>
          {loading ? "Добавление..." : "Добавить"}
        </button>
      </form>
    </div>
  );
};

export default AddAdminSection;
