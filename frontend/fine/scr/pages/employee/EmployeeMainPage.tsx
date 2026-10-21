import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Fine } from "../../types";
import { deleteFine, downloadFineWord, downloadPeriodExcel, getAllFines } from "../../api/fineApi";
import { getErrorDetail, saveBlob } from "../../utils";
import Sidebar from "../../components/Sidebar";
import FineTable from "../../components/FineTable";
import FineEditModal from "../../components/FineEditModal";
import PeriodPicker from "../../components/PeriodPicker";

type Section = "svodka" | "fines" | "report";

const PAID_STATUS_ID = 1;
const OVERDUE_STATUS_ID = 3;

export default function EmployeeMainPage() {
  const { employee, setEmployee } = useAuth();
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("svodka");

  const [allFines, setAllFines] = useState<Fine[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [selectedFine, setSelectedFine] = useState<Fine | null>(null);
  const [showEdit, setShowEdit] = useState(false);
  const [editingFine, setEditingFine] = useState<Fine | null>(null);

  const [reportSearch, setReportSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedReportFine, setSelectedReportFine] = useState<Fine | null>(null);

  const loadFines = useCallback(async () => {
    try {
      setAllFines(await getAllFines());
      setLoadError(null);
    } catch {
      setLoadError("Не удалось загрузить штрафы. Проверьте, что сервер доступен.");
    }
  }, []);

  useEffect(() => {
    void loadFines();
  }, [loadFines]);

  const summary = useMemo(() => {
    const paid = allFines.filter((f) => f.id_status_fine === PAID_STATUS_ID);
    const overdue = allFines.filter((f) => f.id_status_fine === OVERDUE_STATUS_ID);
    const unpaid = allFines.length - paid.length - overdue.length;
    const totalDebt = allFines
      .filter((f) => f.id_status_fine !== PAID_STATUS_ID)
      .reduce((sum, f) => sum + Number(f.fine_sum), 0);
    return { total: allFines.length, paid: paid.length, unpaid, overdue: overdue.length, total_sum: totalDebt };
  }, [allFines]);

  const fines = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query ? allFines.filter((f) => f.num_post.toLowerCase().includes(query)) : allFines;
  }, [allFines, search]);

  const reportFines = useMemo(() => {
    const query = reportSearch.trim().toLowerCase();
    return allFines.filter((f) => {
      const day = f.date_time.slice(0, 10);
      if (dateFrom && day < dateFrom) return false;
      if (dateTo && day > dateTo) return false;
      return !query || f.num_post.toLowerCase().includes(query);
    });
  }, [allFines, reportSearch, dateFrom, dateTo]);

  const logout = () => {
    setEmployee(null);
    navigate("/");
  };

  const exportWord = async () => {
    if (!selectedReportFine) {
      alert("Выберите строку в таблице отчёта");
      return;
    }
    try {
      const blob = await downloadFineWord(selectedReportFine.id);
      saveBlob(blob, `postanovlenie_${selectedReportFine.id}.docx`);
    } catch (error) {
      alert(getErrorDetail(error, "Не удалось сформировать Word-документ"));
    }
  };

  const exportExcel = async () => {
    if (!dateFrom || !dateTo) {
      alert("Сначала выберите период");
      return;
    }
    try {
      const blob = await downloadPeriodExcel(dateFrom, dateTo);
      saveBlob(blob, `report_${dateFrom}_${dateTo}.xlsx`);
    } catch (error) {
      const status = (error as { response?: { status?: number } })?.response?.status;
      alert(status === 404 ? "За выбранный период неоплаченных постановлений не найдено" : "Не удалось сформировать Excel-отчёт");
    }
  };

  const handleDelete = async () => {
    if (!selectedFine) {
      alert("Выберите запись");
      return;
    }
    if (!window.confirm(`Удалить постановление ${selectedFine.num_post}?`)) return;
    try {
      await deleteFine(selectedFine.id);
      setSelectedFine(null);
      await loadFines();
    } catch (error) {
      alert(getErrorDetail(error, "Не удалось удалить штраф"));
    }
  };

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
        {loadError && <div className="error-text">{loadError}</div>}

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
            <FineTable fines={allFines} />
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
              <span className="spacer" />
              <button
                className="btn btn-secondary btn-sm"
                style={{ width: "auto" }}
                onClick={() => { setEditingFine(null); setShowEdit(true); }}
              >
                Добавить
              </button>
              <button
                className="btn btn-secondary btn-sm"
                style={{ width: "auto" }}
                onClick={() => selectedFine ? (setEditingFine(selectedFine), setShowEdit(true)) : alert("Выберите запись")}
              >
                Редактировать
              </button>
              <button className="btn btn-danger btn-sm" style={{ width: "auto" }} onClick={handleDelete}>
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
              <span className="spacer" />
              <button className="btn btn-secondary btn-sm" style={{ width: "auto" }} onClick={exportWord}>Word</button>
              <button className="btn btn-secondary btn-sm" style={{ width: "auto" }} onClick={exportExcel}>Excel</button>
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
          employeeId={employee.id}
          onClose={() => setShowEdit(false)}
          onSaved={() => { setSelectedFine(null); void loadFines(); }}
        />
      )}
    </div>
  );
}