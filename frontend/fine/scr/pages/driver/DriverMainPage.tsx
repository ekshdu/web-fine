import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { Fine } from "../../types";
import DriverProfileModal from "../../components/DriverProfileModal";
import PayFineModal from "../../components/PayFineModal";
export default function DriverMainPage() {
  const { driver, setDriver } = useAuth();
  const [fines] = useState<Fine[]>([]); 
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showPay, setShowPay] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
    setDriver(null);
    navigate("/");
  };
  if (!driver) return null;
  const fio = `${driver.surname} ${driver.name} ${driver.middle_name || ""}`.trim();
  const selectedFine = fines.find((f) => f.id === selectedId) || null;

  return (
    <div className="page">
      <div className="top-bar">
        <button onClick={logout}>Выйти</button>
        <button onClick={() => setShowProfile(true)}>{fio}</button>
      </div>
      <button
        className="btn-primary"
        onClick={() => selectedId ? setShowPay(true) : alert("Выберите штраф для оплаты")}
      >
        Оплатить выбранный штраф
      </button>
      <table className="data-table">
        <thead>
          <tr>
            <th>Дата</th><th>Постановление</th><th>Госномер</th>
            <th>Модель</th><th>Место</th><th>Сумма</th><th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {fines.length === 0 && (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", color: "#888" }}>
                Данные о штрафах пока недоступны (backend не подключён)
              </td>
            </tr>
          )}
          {fines.map((f) => (
            <tr key={f.id}
                className={selectedId === f.id ? "selected" : ""}
                onClick={() => setSelectedId(f.id)}>
              <td>{f.date_time}</td>
              <td>{f.num_post}</td>
              <td>{f.car_num}</td>
              <td>{f.car_model}</td>
              <td>{f.fine_place}</td>
              <td>{f.summary}</td>
              <td>{f.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showProfile && (
        <DriverProfileModal driver={driver} onClose={() => setShowProfile(false)} />
      )}
      {showPay && selectedFine && (
        <PayFineModal fine={selectedFine} onClose={() => setShowPay(false)} onPaid={() => {}} />
      )}
    </div>
  );
}