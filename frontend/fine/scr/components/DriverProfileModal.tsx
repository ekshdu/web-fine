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
    alert("Функция добавления авто пока не подключена к серверу");
    console.log("Новый авто:", { plate, model, driver_id: driver.driver_id });
    setPlate(""); setModel("");
  };
  const fio = `${driver.surname} ${driver.name} ${driver.middle_name || ""}`.trim();
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Добавить автомобиль</h2>
        <p>Водитель: {fio}</p>
        <input className="input-field" placeholder="Госномер новой машины"
               value={plate} onChange={(e) => setPlate(e.target.value)} />
        <input className="input-field" placeholder="Модель новой машины"
               value={model} onChange={(e) => setModel(e.target.value)} />
        <button className="btn-primary" onClick={addCar}>Добавить автомобиль</button>
        <button className="btn-secondary" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
}