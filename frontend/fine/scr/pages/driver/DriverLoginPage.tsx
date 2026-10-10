import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function DriverLoginPage() {
  const [plate, setPlate] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setDriver } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!plate.trim()) {
      setError("Введите госномер");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/driver/login", { plate: plate.trim() });
      setDriver(data);
      navigate("/driver/main");
    } catch {
      setError("Водитель с таким госномером не найден");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centered-page">
      <div className="auth-box">
        <h1>Вход для водителя</h1>

        <div className="form-group">
          <label className="form-label">Госномер</label>
          <input
            className="input-field"
            placeholder="А123АА77"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="btn btn-primary" onClick={handleLogin} disabled={loading}>
          {loading ? "Проверяем..." : "Войти"}
        </button>
        <div className="spacer-top" />
        <button className="btn btn-secondary" onClick={() => navigate("/driver/register")}>
          Регистрация
        </button>
        <button className="link-btn" onClick={() => navigate("/")}>
          Назад
        </button>
      </div>
    </div>
  );
}