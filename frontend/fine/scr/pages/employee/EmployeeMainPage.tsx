import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Fine } from "../../types";
import FineTable from "../../components/FineTable";
import FineEditModal from "../../components/FineEditModal";
import PeriodPicker from "../../components/PeriodPicker";
type Tab = "svodka" | "fines" | "report";
export default function EmployeeMainPage() {
  const { setEmployee } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("svodka");
  const [summary] = useState({ total: 0, paid: 0, unpaid: 0, overdue: 0, total_sum: 0 });
  const [svodkaFines] = useState<Fine[]>([]);
  const [search, setSearch] = useState("");
  const [fines] = useState<Fine[]>([]); // TODO: подключить GET /employee/fines
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
  return (
    <div className="page">
      <div className="top-bar">
        <button onClick={logout}>Выход</button>
      </div>
      <div className="tabs">
        <button className={tab === "svodka" ? "tab active" : "tab"} onClick={() => setTab("svodka")}>Сводка</button>
        <button className={tab === "fines" ? "tab active" : "tab"} onClick={() => setTab("fines")}>Штрафы</button>
        <button className={tab === "report" ? "tab active" : "tab"} onClick={() => setTab("report")}>Отчет</button>
      </div>
      {tab === "svodka" && (
        <div>
          <div className="stats-row">
            <div className="stat-box">Всего штрафов<br />{summary.total}</div>
            <div className="stat-box">Оплаченных<br />{summary.paid}</div>
            <div className="stat-box">Не оплачено<br />{summary.unpaid}</div>
            <div className="stat-box">Задолженность<br />{summary.overdue}</div>
            <div className="stat-box">Общий долг<br />{summary.total_sum} руб.</div>
          </div>
          <FineTable fines={svodkaFines} />
        </div>
      )}
      {tab === "fines" && (
        <div>
          <div className="toolbar">
            <input className="input-field" placeholder="Поиск по номеру постановления..."
                   value={search} onChange={(e) => setSearch(e.target.value)} />
            <button onClick={notReady}>Найти</button>
            <button onClick={() => { setEditingFine(null); setShowEdit(true); }}>Добавить</button>
            <button onClick={() => selectedFine ? (setEditingFine(selectedFine), setShowEdit(true)) : alert("Выберите запись")}>Редактировать</button>
            <button onClick={notReady}>Удалить</button>
          </div>
          <FineTable fines={fines} selectedId={selectedFine?.id} onRowClick={setSelectedFine} />
        </div>
      )}
      {tab === "report" && (
        <div>
          <div className="toolbar">
            <PeriodPicker
              dateFrom={dateFrom} dateTo={dateTo}
              onChange={(f, t) => { setDateFrom(f); setDateTo(t); }}
              onReset={() => { setDateFrom(""); setDateTo(""); }}
            />
            <input className="input-field" placeholder="Поиск по постановлению"
                   value={reportSearch} onChange={(e) => setReportSearch(e.target.value)} />
            <button onClick={notReady}>Найти</button>
            <button onClick={notReady}>Word</button>
            <button onClick={notReady}>Excel</button>
          </div>
          <FineTable
            fines={reportFines}
            selectedId={selectedReportFine?.id}
            onRowClick={setSelectedReportFine}
          />
        </div>
      )}
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