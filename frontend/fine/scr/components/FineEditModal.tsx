import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import type { Fine, ReferenceData } from "../types/fine";
import { createFine, getReferences, updateFine } from "../api/fineApi";
import { getErrorDetail } from "../utils";

interface FineEditModalProps {
  /** Штраф для редактирования; null — режим создания нового штрафа */
  fine: Fine | null;
  employeeId: number;
  onClose: () => void;
  onSaved: (savedFine: Fine) => void;
}

const toInputDateTime = (value?: string): string => {
  if (value) return value.slice(0, 16);
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  return now.toISOString().slice(0, 16);
};

const FineEditModal = ({ fine, employeeId, onClose, onSaved }: FineEditModalProps): ReactElement => {
  const isCreate = fine === null;

  const [references, setReferences] = useState<ReferenceData | null>(null);
  const [carNum, setCarNum] = useState(fine?.car_num ?? "");
  const [dateTime, setDateTime] = useState(toInputDateTime(fine?.date_time));
  const [finePlace, setFinePlace] = useState(fine?.fine_place ?? "");
  const [idFineSection, setIdFineSection] = useState<number>(fine?.id_fine_section ?? 0);
  const [idSpeedFine, setIdSpeedFine] = useState<number>(fine?.id_speed_fine ?? 0);
  const [actualSpeed, setActualSpeed] = useState<number>(fine?.actual_speed ?? 0);
  const [idFineSum, setIdFineSum] = useState<number>(fine?.id_fine_sum ?? 0);
  const [idStatusFine, setIdStatusFine] = useState<number>(fine?.id_status_fine ?? 0);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    getReferences()
      .then((data) => {
        setReferences(data);
        // при создании подставляем первые значения справочников, иначе в запрос уйдут нули
        if (isCreate) {
          setIdFineSection(data.fine_sections[0]?.id ?? 0);
          setIdSpeedFine(data.fine_speeds[0]?.id ?? 0);
          setIdFineSum(data.fine_sums[0]?.id ?? 0);
        }
      })
      .catch(() => setErrorMessage("Не удалось загрузить справочники"));
  }, [isCreate]);

  const handleSave = async () => {
    if (isCreate && (!carNum.trim() || !finePlace.trim())) {
      setErrorMessage("Заполните госномер и место нарушения");
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);
    try {
      let saved: Fine;
      if (isCreate) {
        saved = await createFine({
          id_emp: employeeId,
          car_num: carNum.trim(),
          date_time: dateTime,
          fine_place: finePlace.trim(),
          id_fine_section: idFineSection,
          id_speed_fine: idSpeedFine,
          actual_speed: actualSpeed,
          id_fine_sum: idFineSum,
        });
      } else {
        saved = await updateFine(fine.id, {
          date_time: dateTime,
          fine_place: finePlace.trim(),
          id_fine_section: idFineSection,
          id_speed_fine: idSpeedFine,
          actual_speed: actualSpeed,
          id_fine_sum: idFineSum,
          id_status_fine: idStatusFine,
        });
      }
      onSaved(saved);
      onClose();
    } catch (error) {
      setErrorMessage(getErrorDetail(error, "Не удалось сохранить штраф. Проверьте соединение с сервером."));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{isCreate ? "Новый штраф" : "Редактирование штрафа"}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {errorMessage && <div className="error-text">{errorMessage}</div>}

        <div className="form-group">
          <label className="form-label">Госномер</label>
          <input
            className="input-field"
            type="text"
            value={carNum}
            disabled={!isCreate}
            onChange={(event) => setCarNum(event.target.value)}
          />
        </div>

        {!isCreate && (
          <div className="form-group">
            <label className="form-label">Номер постановления</label>
            <input className="input-field" type="text" value={fine.num_post} disabled />
          </div>
        )}

        <div className="form-group">
          <label className="form-label">Дата и время</label>
          <input className="input-field" type="datetime-local" value={dateTime} onChange={(event) => setDateTime(event.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Место нарушения</label>
          <input className="input-field" type="text" value={finePlace} onChange={(event) => setFinePlace(event.target.value)} />
        </div>

        <div className="form-group">
          <label className="form-label">Статья</label>
          <select className="input-field" value={idFineSection} onChange={(event) => setIdFineSection(Number(event.target.value))}>
            {references?.fine_sections.map((section) => (
              <option key={section.id} value={section.id}>{section.section_num}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Ограничение скорости</label>
          <select className="input-field" value={idSpeedFine} onChange={(event) => setIdSpeedFine(Number(event.target.value))}>
            {references?.fine_speeds.map((speed) => (
              <option key={speed.id} value={speed.id}>{speed.fine_speed} км/ч</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Фактическая скорость, км/ч</label>
          <input className="input-field" type="number" min={0} value={actualSpeed} onChange={(event) => setActualSpeed(Number(event.target.value))} />
        </div>

        <div className="form-group">
          <label className="form-label">Сумма штрафа</label>
          <select className="input-field" value={idFineSum} onChange={(event) => setIdFineSum(Number(event.target.value))}>
            {references?.fine_sums.map((sum) => (
              <option key={sum.id} value={sum.id}>{sum.summary} ₽</option>
            ))}
          </select>
        </div>

        {!isCreate && (
          <div className="form-group">
            <label className="form-label">Статус</label>
            <select className="input-field" value={idStatusFine} onChange={(event) => setIdStatusFine(Number(event.target.value))}>
              {references?.statuses.map((status) => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose} disabled={isSaving}>Отмена</button>
          <button className="btn btn-primary" onClick={handleSave} disabled={isSaving || !references}>
            {isSaving ? "Сохранение..." : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FineEditModal;