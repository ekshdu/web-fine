import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function EmployeeLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setEmployee } = useAuth();
  const navigate = useNavigate();

  const login = async () => {
    setError("");
    if (!username || !password) {
      setError("Введите логин и пароль");
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post("/employee/login", { username, password });
      setEmployee(data);
      navigate("/employee");
    } catch {
      setError("Неверный логин или пароль");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centered-page">
      <div className="auth-box">
        <h1>Вход сотрудника</h1>

        <div className="form-group">
          <label className="form-label">Логин</label>
          <input className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Пароль</label>
          <input
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="btn btn-primary" onClick={login} disabled={loading}>
          {loading ? "Проверяем..." : "Войти"}
        </button>
        <button className="link-btn" onClick={() => navigate("/")}>
          Назад
        </button>
      </div>
    </div>
  );
}