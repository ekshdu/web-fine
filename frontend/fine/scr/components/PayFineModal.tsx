import type { Fine } from "../types";
interface Props {
  fine: Fine;
  onClose: () => void;
  onPaid: () => void;
}
export default function PayFineModal({ fine, onClose, onPaid }: Props) {
  const pay = () => {
    alert("Функция оплаты пока не подключена к серверу");
    onPaid();
    onClose();
  };
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>ОПЛАТА ШТРАФА</h2>
        <div className="info-box">
          <p>Дата: {fine.date_time}</p>
          <p>Постановление: {fine.num_post}</p>
          <p>Госномер: {fine.car_num}</p>
          <p>Место: {fine.fine_place}</p>
          <p>Сумма: {fine.summary} руб.</p>
          <p>Статус: {fine.status}</p>
        </div>
        <button className="btn-primary" onClick={pay}>Оплатить</button>
        <button className="btn-secondary" onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
}