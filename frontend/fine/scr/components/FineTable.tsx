import type { Fine } from "../types";
import StatusBadge from "./StatusBadge";

interface Props {
  fines: Fine[];
  onRowClick?: (fine: Fine) => void;
  selectedId?: number | null;
}

const headers = ["ID", "Дата", "Постановление", "ФИО", "Госномер", "Место", "Статья", "Факт/Лимит ск.", "Сумма", "Статус"];

export default function FineTable({ fines, onRowClick, selectedId }: Props) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {fines.length === 0 && (
            <tr className="empty-row">
              <td colSpan={headers.length}>Нет данных. Backend еще не подключен.</td>
            </tr>
          )}
          {fines.map((f) => (
            <tr
              key={f.id}
              className={selectedId === f.id ? "selected" : ""}
              onClick={() => onRowClick && onRowClick(f)}
            >
              <td>{f.id}</td>
              <td>{f.date_time}</td>
              <td>{f.num_post}</td>
              <td>{f.fio}</td>
              <td>{f.car_num}</td>
              <td>{f.fine_place}</td>
              <td>{f.section_num || "-"}</td>
              <td>{f.actual_speed || "-"} / {f.fine_speedcol || "-"}</td>
              <td>{f.summary} руб.</td>
              <td><StatusBadge status={f.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}