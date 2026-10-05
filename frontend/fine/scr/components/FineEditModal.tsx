import { useState } from "react";
import type { Fine } from "../types";

interface Props {
  fine?: Fine | null;
  onClose: () => void;
  onSaved: () => void;
}
const FINE_SUMS = [
  { id: 1, summary: 500 }, { id: 2, summary: 1000 },
  { id: 3, summary: 1500 }, { id: 4, summary: 3000 }, { id: 5, summary: 5000 },
];
const STATUSES = [
  { id: 1, name: "Оплачен" }, { id: 2, name: "Не оплачен" }, { id: 3, name: "Просрочен" },
];
const SECTIONS = [
  { id: 1, section_num: "12.9 ч.2" }, { id: 2, section_num: "12.9 ч.3" },
  { id: 3, section_num: "12.12 ч.1" }, { id: 4, section_num: "12.16 ч.1" },
];
const SPEEDS = [
  { id: 1, fine_speedcol: 60 }, { id: 2, fine_speedcol: 80 },
  { id: 3, fine_speedcol: 90 }, { id: 4, fine_speedcol: 110 },
];
export default function FineEditModal({ fine, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    date_time: fine?.date_time?.slice(0, 19).replace("T", " ") ||
      new Date().toISOString().slice(0, 19).replace("T", " "),
    plate: fine?.car_num || "",
    fine_place: fine?.fine_place || "",
    id_fine_sum: "",
    id_status_fine: "",
    id_fine_section: "",
    id_speed_fine: "",
    actual_speed: fine?.actual_speed?.toString() || "",
  });
  const set = (field: string) => (e: any) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const save = () => {
    if (!form.date_time || !form.plate || !form.fine_place) {
      alert("Заполните дату, госномер и место");
      return;
    }
    alert("Сохранение пока не подключено к серверу");
    console.log("Данные формы штрафа:", form);
    onSaved();
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{fine ? "Редактирование штрафа" : "Добавление штрафа"}</h2>
        <input className="input-field" placeholder="Дата (ГГГГ-ММ-ДД ЧЧ:ММ:СС)"
               value={form.date_time} onChange={set("date_time")} />
        <input className="input-field" placeholder="Госномер"
               value={form.plate} onChange={set("plate")} />
        <input className="input-field" placeholder="Место нарушения"
               value={form.fine_place} onChange={set("fine_place")} />
        <select className="input-field" value={form.id_fine_section} onChange={set("id_fine_section")}>
          <option value="">Статья КоАП</option>
          {SECTIONS.map((s) => <option key={s.id} value={s.id}>{s.section_num}</option>)}
        </select>
        <select className="input-field" value={form.id_speed_fine} onChange={set("id_speed_fine")}>
          <option value="">Без нарушения скорости</option>
          {SPEEDS.map((s) => <option key={s.id} value={s.id}>{s.fine_speedcol} км/ч</option>)}
        </select>
        <input className="input-field" placeholder="Фактическая скорость"
               value={form.actual_speed} onChange={set("actual_speed")} />
        <select className="input-field" value={form.id_fine_sum} onChange={set("id_fine_sum")}>
          <option value="">Сумма штрафа</option>
          {FINE_SUMS.map((s) => <option key={s.id} value={s.id}>{s.summary} руб.</option>)}
        </select>
        {fine && (
          <select className="input-field" value={form.id_status_fine} onChange={set("id_status_fine")}>
            <option value="">Статус</option>
            {STATUSES.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        )}
        <button className="btn-primary" onClick={save}>Сохранить</button>
        <button className="btn-secondary" onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
}