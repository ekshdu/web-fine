import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Fine } from "../../types";
import Sidebar from "../../components/Sidebar";
import DriverProfileModal from "../../components/DriverProfileModal";
import PayFineModal from "../../components/PayFineModal";
import StatusBadge from "../../components/StatusBadge";

type Section = "fines" | "profile";

export default function DriverMainPage() {
  const { driver, setDriver } = useAuth();
  const [section, setSection] = useState<Section>("fines");
  const [fines] = useState<Fine[]>([]); // TODO: подключить GET /driver/{id}/fines
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showPay, setShowPay] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setDriver(null);
    navigate("/");
  };

  if (!driver) return null;

  const fio = `${driver.surname} ${driver.name} ${driver.middle_name || ""}`.trim();
  const selectedFine = fines.find((f) => f.id === selectedId) || null;

  const navItems = [
    { key: "fines", label: "Мои штрафы" },
    { key: "profile", label: "Профиль" },
  ];

  return (
    <div className="app-layout">
      <Sidebar
        title="ГИБДД Онлайн"
        subtitle="Кабинет водителя"
        items={navItems}
        activeKey={section}
        onSelect={(k) => setSection(k as Section)}
        userName={fio}
        onLogout={logout}
      />

      <main className="main-content">
        {section === "fines" && (
          <>
            <h2 className="page-heading">Мои штрафы</h2>

            <div className="toolbar">
              <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
                {driver.car_model} · {driver.car_num}
              </span>
              <span className="spacer" />
              <button
                className="btn btn-primary btn-sm"
                style={{ width: "auto" }}
                onClick={() => (selectedId ? setShowPay(true) : alert("Выберите штраф для оплаты"))}
              >
                Оплатить выбранный штраф
              </button>
            </div>

            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Дата</th><th>Постановление</th><th>Госномер</th>
                    <th>Модель</th><th>Место</th><th>Сумма</th><th>Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {fines.length === 0 && (
                    <tr className="empty-row">
                      <td colSpan={7}>Штрафов не найдено. Данные появятся после подключения backend.</td>
                    </tr>
                  )}
                  {fines.map((f) => (
                    <tr
                      key={f.id}
                      className={selectedId === f.id ? "selected" : ""}
                      onClick={() => setSelectedId(f.id)}
                    >
                      <td>{f.date_time}</td>
                      <td>{f.num_post}</td>
                      <td>{f.car_num}</td>
                      <td>{f.car_model}</td>
                      <td>{f.fine_place}</td>
                      <td>{f.summary} руб.</td>
                      <td><StatusBadge status={f.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {section === "profile" && (
          <>
            <h2 className="page-heading">Профиль</h2>
            <div className="panel">
              <div className="info-box">
                <p><b>ФИО</b>{fio}</p>
                <p><b>Автомобиль</b>{driver.car_model} · {driver.car_num}</p>
              </div>
              <div className="spacer-top" />
              <button className="btn btn-secondary" style={{ width: "auto" }} onClick={() => setShowProfileModal(true)}>
                Добавить автомобиль
              </button>
            </div>
          </>
        )}
      </main>

      {showProfileModal && (
        <DriverProfileModal driver={driver} onClose={() => setShowProfileModal(false)} />
      )}
      {showPay && selectedFine && (
        <PayFineModal fine={selectedFine} onClose={() => setShowPay(false)} onPaid={() => {}} />
      )}
    </div>
  );
}