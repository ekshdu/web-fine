import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function DriverLoginPage() {
  const [plate, setPlate] = useState("");
  const [error, setError] = useState("");
  const { setDriver } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!plate.trim()) {
      setError("Введите госномер");
      return;
    }
    try {
      const { data } = await api.post("/driver/login", { plate: plate.trim() });
      setDriver(data);
      navigate("/driver/main");
    } catch {
      setError("Водитель не найден");
    }
  };

  return (
    <div className="centered-page">
      <h1>ВХОД ДЛЯ ВОДИТЕЛЯ</h1>
      <input
        className="input-field"
        placeholder="Введите госномер (А123АА77)"
        value={plate}
        onChange={(e) => setPlate(e.target.value.toUpperCase())}
      />
      {error && <p className="error-text">{error}</p>}
      <button className="btn-primary" onClick={handleLogin}>Войти</button>
      <button className="btn-secondary" onClick={() => navigate("/driver/register")}>Регистрация</button>
      <button className="btn-secondary" onClick={() => navigate("/")}>Назад</button>
    </div>
  );
}