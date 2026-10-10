import { useState } from "react";
import type { Driver } from "../types";

interface Props {
  driver: Driver;
  onClose: () => void;
}

export default function DriverProfileModal({ driver, onClose }: Props) {
  const [plate, setPlate] = useState("");
  const [model, setModel] = useState("");

  const addCar = () => {
    if (!plate || !model) {
      alert("Заполните госномер и модель");
      return;
    }
    // TODO: подключить POST /driver/car, когда появится на backend
    alert("Функция добавления авто пока не подключена к серверу");
    console.log("Новый авто:", { plate, model, driver_id: driver.driver_id });
    setPlate(""); setModel("");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Добавить автомобиль</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="form-group">
          <label className="form-label">Госномер</label>
          <input className="input-field" value={plate} onChange={(e) => setPlate(e.target.value.toUpperCase())} />
        </div>
        <div className="form-group">
          <label className="form-label">Модель</label>
          <input className="input-field" value={model} onChange={(e) => setModel(e.target.value)} />
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Закрыть</button>
          <button className="btn btn-primary" onClick={addCar}>Добавить</button>
        </div>
      </div>
    </div>
  );
}