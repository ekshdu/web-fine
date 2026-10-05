import type { Fine } from "../types";
interface Props {
  fines: Fine[];
  onRowClick?: (fine: Fine) => void;
  selectedId?: number | null;
}
const headers = ["ID", "Дата", "Постановление", "ФИО", "Госномер", "Место", "Статья", "Факт/Лимит ск.", "Сумма", "Статус"];
export default function FineTable({ fines, onRowClick, selectedId }: Props) {
  return (
    <table className="data-table">
      <thead>
        <tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {fines.length === 0 && (
          <tr>
            <td colSpan={headers.length} style={{ textAlign: "center", color: "#888" }}>
              Нет данных (backend не подключён)
            </td>
          </tr>
        )}
        {fines.map((f) => (
          <tr key={f.id}
              className={selectedId === f.id ? "selected" : ""}
              onClick={() => onRowClick && onRowClick(f)}>
            <td>{f.id}</td>
            <td>{f.date_time}</td>
            <td>{f.num_post}</td>
            <td>{f.fio}</td>
            <td>{f.car_num}</td>
            <td>{f.fine_place}</td>
            <td>{f.section_num || "-"}</td>
            <td>{f.actual_speed || "-"} / {f.fine_speedcol || "-"}</td>
            <td>{f.summary}</td>
            <td>{f.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}