import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Fine } from "../../types";
import { getDriverCars } from "../../api/carApi";
import { getFinesByCarNum } from "../../api/fineApi";
import { formatDateTime } from "../../utils";
import Sidebar from "../../components/Sidebar";
import DriverProfileModal from "../../components/DriverProfileModal";
import PayFineModal from "../../components/PayFineModal";
import StatusBadge from "../../components/StatusBadge";

type Section = "fines" | "profile";

export default function DriverMainPage() {
  const { driver, setDriver } = useAuth();
  const [section, setSection] = useState<Section>("fines");
  const [fines, setFines] = useState<Fine[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showPay, setShowPay] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const navigate = useNavigate();
  const driverId = driver?.driver_id;

  const loadFines = useCallback(async () => {
    if (driverId === undefined) return;
    try {
      const cars = await getDriverCars(driverId);
      const lists = await Promise.all(cars.map((car) => getFinesByCarNum(car.car_num)));
      setFines(lists.flat().sort((a, b) => b.date_time.localeCompare(a.date_time)));
      setLoadError(null);
    } catch {
      setLoadError("Не удалось загрузить штрафы. Проверьте, что сервер доступен.");
    }
  }, [driverId]);

  useEffect(() => {
    void loadFines();
  }, [loadFines]);

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
            {loadError && <div className="error-text">{loadError}</div>}

            <div className="toolbar">
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
                      <td colSpan={7}>Штрафов не найдено.</td>
                    </tr>
                  )}
                  {fines.map((f) => (
                    <tr
                      key={f.id}
                      className={selectedId === f.id ? "selected" : ""}
                      onClick={() => setSelectedId(f.id)}
                    >
                      <td>{formatDateTime(f.date_time)}</td>
                      <td>{f.num_post}</td>
                      <td>{f.car_num}</td>
                      <td>{f.car_model}</td>
                      <td>{f.fine_place}</td>
                      <td>{f.fine_sum} руб.</td>
                      <td><StatusBadge status={f.status_name} /></td>
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
              </div>
              <div className="spacer-top" />
              <button className="btn btn-secondary" style={{ width: "auto" }} onClick={() => setShowProfileModal(true)}>
                Мои автомобили
              </button>
            </div>
          </>
        )}
      </main>

      {showProfileModal && (
        <DriverProfileModal driverId={driver.driver_id} onClose={() => { setShowProfileModal(false); void loadFines(); }} />
      )}
      {showPay && selectedFine && (
        <PayFineModal fine={selectedFine} onClose={() => setShowPay(false)} onPaid={() => { setSelectedId(null); void loadFines(); }} />
      )}
    </div>
  );
}