import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function EmployeeLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setEmployee } = useAuth();
  const navigate = useNavigate();

  const login = async () => {
    if (!username || !password) {
      alert("Введите логин и пароль");
      return;
    }
    try {
      const { data } = await api.post("/employee/login", { username, password });
      setEmployee(data);
      navigate("/employee");
    } catch {
      alert("Неверный логин/пароль");
    }
  };

  return (
    <div className="centered-page">
      <h1>ВХОД СОТРУДНИКА</h1>
      <input className="input-field" placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="input-field" type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn-primary" onClick={login}>Войти</button>
      <button className="btn-secondary" onClick={() => navigate("/")}>Назад</button>
    </div>
  );
}