import type { Fine } from "../types";
import StatusBadge from "./StatusBadge";

interface Props {
  fine: Fine;
  onClose: () => void;
  onPaid: () => void;
}

export default function PayFineModal({ fine, onClose, onPaid }: Props) {
  const pay = () => {
    // TODO: подключить POST /fines/{id}/pay, когда появится на backend
    alert("Функция оплаты пока не подключена к серверу");
    onPaid();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Оплата штрафа</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="info-box">
          <p><b>Дата</b>{fine.date_time}</p>
          <p><b>Постановление</b>{fine.num_post}</p>
          <p><b>Госномер</b>{fine.car_num}</p>
          <p><b>Место</b>{fine.fine_place}</p>
          <p><b>Сумма</b>{fine.summary} руб.</p>
          <p><b>Статус</b> <StatusBadge status={fine.status} /></p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Отмена</button>
          <button className="btn btn-primary" onClick={pay}>Оплатить</button>
        </div>
      </div>
    </div>
  );
}