import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Fine } from "../../types";
import Sidebar from "../../components/Sidebar";
import FineTable from "../../components/FineTable";
import FineEditModal from "../../components/FineEditModal";
import PeriodPicker from "../../components/PeriodPicker";

type Section = "svodka" | "fines" | "report";

export default function EmployeeMainPage() {
  const { employee, setEmployee } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("svodka");

  const [summary] = useState({ total: 0, paid: 0, unpaid: 0, overdue: 0, total_sum: 0 });
  const [svodkaFines] = useState<Fine[]>([]);

  const [search, setSearch] = useState("");
  const [fines] = useState<Fine[]>([]); 
  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editingFine, setEditingFine] = useState<Fine | null>(null);

  const [reportSearch, setReportSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [reportFines] = useState<Fine[]>([]);
  const [selectedReportFine, setSelectedReportFine] = useState<Fine | null>(null);

  const logout = () => {
    setEmployee(null);
    navigate("/");
  };

  const notReady = () => alert("Функция пока не подключена к серверу");

  if (!employee) return null;

  const fio = `${employee.surname} ${employee.name} ${employee.middle_name || ""}`.trim();

  const navItems = [
    { key: "svodka", label: "Сводка" },
    { key: "fines", label: "Штрафы" },
    { key: "report", label: "Отчет" },
  ];

  return (
    <div className="app-layout">
      <Sidebar
        title="ГИБДД Онлайн"
        subtitle="Кабинет сотрудника"
        items={navItems}
        activeKey={section}
        onSelect={(k) => setSection(k as Section)}
        userName={fio}
        onLogout={logout}
      />

      <main className="main-content">
        {section === "svodka" && (
          <>
            <h2 className="page-heading">Сводка</h2>
            <div className="stats-row">
              <div className="stat-box">
                <span className="stat-label">Всего штрафов</span>
                <span className="stat-value">{summary.total}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Оплачено</span>
                <span className="stat-value">{summary.paid}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Не оплачено</span>
                <span className="stat-value">{summary.unpaid}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Просрочено</span>
                <span className="stat-value">{summary.overdue}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Общий долг</span>
                <span className="stat-value">{summary.total_sum} руб.</span>
              </div>
            </div>
            <FineTable fines={svodkaFines} />
          </>
        )}

        {section === "fines" && (
          <>
            <h2 className="page-heading">Штрафы</h2>
            <div className="toolbar">
              <input
                className="input-field"
                placeholder="Поиск по номеру постановления..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-secondary btn-sm" style={{ width: "auto" }} onClick={notReady}>Найти</button>
              <span className="spacer" />
              <button className="btn btn-secondary btn-sm" style={{ width: "auto" }} onClick={() => { setEditingFine(null); setShowEdit(true); }}>
                Добавить
              </button>
              <button
                className="btn btn-secondary btn-sm"
                style={{ width: "auto" }}
                onClick={() => selectedFine ? (setEditingFine(selectedFine), setShowEdit(true)) : alert("Выберите запись")}
              >
                Редактировать
              </button>
              <button className="btn btn-danger btn-sm" style={{ width: "auto" }} onClick={notReady}>
                Удалить
              </button>
            </div>
            <FineTable fines={fines} selectedId={selectedFine?.id} onRowClick={setSelectedFine} />
          </>
        )}

        {section === "report" && (
          <>
            <h2 className="page-heading">Отчет</h2>
            <div className="toolbar">
              <PeriodPicker
                dateFrom={dateFrom} dateTo={dateTo}
                onChange={(f, t) => { setDateFrom(f); setDateTo(t); }}
                onReset={() => { setDateFrom(""); setDateTo(""); }}
              />
              <input
                className="input-field"
                placeholder="Поиск по постановлению"
                value={reportSearch}
                onChange={(e) => setReportSearch(e.target.value)}
              />
              <button className="btn btn-secondary btn-sm" style={{ width: "auto" }} onClick={notReady}>Найти</button>
              <span className="spacer" />
              <button className="btn btn-secondary btn-sm" style={{ width: "auto" }} onClick={notReady}>Word</button>
              <button className="btn btn-secondary btn-sm" style={{ width: "auto" }} onClick={notReady}>Excel</button>
            </div>
            <FineTable
              fines={reportFines}
              selectedId={selectedReportFine?.id}
              onRowClick={setSelectedReportFine}
            />
          </>
        )}
      </main>

      {showEdit && (
        <FineEditModal
          fine={editingFine}
          onClose={() => setShowEdit(false)}
          onSaved={() => {}}
        />
      )}
    </div>
  );
}