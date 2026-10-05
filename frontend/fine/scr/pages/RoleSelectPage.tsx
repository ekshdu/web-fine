import { useNavigate } from "react-router-dom";

export default function RoleSelectPage() {
  const navigate = useNavigate();
  return (
    <div className="centered-page">
      <h1>Система мониторинга штрафов ГИБДД</h1>
      <button className="btn-primary" onClick={() => navigate("/driver/login")}>
        Вход по госномеру (Водитель)
      </button>
      <button className="btn-primary" onClick={() => navigate("/employee/login")}>
        Вход для сотрудника
      </button>
    </div>
  );
}