import { useNavigate } from "react-router-dom";

export default function RoleSelectPage() {
  const navigate = useNavigate();

  return (
    <div className="role-page">
      <h1>Система мониторинга штрафов ГИБДД</h1>
      <p className="role-sub">Выберите способ входа в систему</p>
      <div className="role-buttons">
        <button className="btn btn-primary" onClick={() => navigate("/driver/login")}>
          Вход по госномеру (Водитель)
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/employee/login")}>
          Вход для сотрудника
        </button>
      </div>
    </div>
  );
}