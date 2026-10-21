import { useState } from "react";
import type { Fine } from "../types";
import { updateFine } from "../api/fineApi";
import { formatDateTime, getErrorDetail } from "../utils";
import StatusBadge from "./StatusBadge";

interface Props {
  fine: Fine;
  onClose: () => void;
  onPaid: () => void;
}

const PAID_STATUS_ID = 1;

export default function PayFineModal({ fine, onClose, onPaid }: Props) {
  const [isPaying, setIsPaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const pay = async () => {
    setIsPaying(true);
    setErrorMessage(null);
    try {
      await updateFine(fine.id, { id_status_fine: PAID_STATUS_ID });
      onPaid();
      onClose();
    } catch (error) {
      setErrorMessage(getErrorDetail(error, "Не удалось оплатить штраф"));
    } finally {
      setIsPaying(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Оплата штрафа</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {errorMessage && <div className="error-text">{errorMessage}</div>}

        <div className="info-box">
          <p><b>Дата</b>{formatDateTime(fine.date_time)}</p>
          <p><b>Постановление</b>{fine.num_post}</p>
          <p><b>Госномер</b>{fine.car_num}</p>
          <p><b>Место</b>{fine.fine_place}</p>
          <p><b>Сумма</b>{fine.fine_sum} руб.</p>
          <p><b>Статус</b> <StatusBadge status={fine.status_name} /></p>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={isPaying}>Отмена</button>
          <button className="btn btn-primary" onClick={pay} disabled={isPaying || fine.id_status_fine === PAID_STATUS_ID}>
            {isPaying ? "Оплата..." : "Оплатить"}
          </button>
        </div>
      </div>
    </div>
  );
}
