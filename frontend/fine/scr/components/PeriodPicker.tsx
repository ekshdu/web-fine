interface Props {
  dateFrom: string;
  dateTo: string;
  onChange: (from: string, to: string) => void;
  onReset: () => void;
}

export default function PeriodPicker({ dateFrom, dateTo, onChange, onReset }: Props) {
  return (
    <div className="period-picker">
      <label>С <input type="date" value={dateFrom} onChange={(e) => onChange(e.target.value, dateTo)} /></label>
      <span>—</span>
      <label>По <input type="date" value={dateTo} onChange={(e) => onChange(dateFrom, e.target.value)} /></label>
      <button className="btn btn-secondary btn-sm" style={{ width: "auto" }} onClick={onReset}>
        Сбросить
      </button>
    </div>
  );
}