import { useCallback, useEffect, useRef, useState } from "react";
import {
  downloadOverdueFile,
  getLatestOverdueReport,
  getOverdueReportStatus,
  startOverdueReport,
} from "../api/reportApi";
import type { OverdueFileKind, OverdueReportLatest } from "../api/reportApi";
import { formatDateTime, getErrorDetail, saveBlob } from "../utils";

type Phase = "idle" | "running" | "done" | "empty" | "error";

const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 120000;

export default function OverdueReportControl() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [message, setMessage] = useState("");
  const [latest, setLatest] = useState<OverdueReportLatest | null>(null);
  const timerRef = useRef<number | null>(null);

  const stopPolling = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const loadLatest = useCallback(async () => {
    try {
      setLatest(await getLatestOverdueReport());
    } catch {
    }
  }, []);

  useEffect(() => {
    void loadLatest();
    return stopPolling;
  }, [loadLatest, stopPolling]);

  const handleStart = async () => {
    stopPolling();
    setPhase("running");
    setMessage("Формируется...");

    let taskId: string;
    try {
      taskId = await startOverdueReport();
    } catch (error) {
      setPhase("error");
      setMessage(getErrorDetail(error, "Не удалось запустить формирование"));
      return;
    }

    const startedAt = Date.now();
    timerRef.current = window.setInterval(async () => {
      if (Date.now() - startedAt > POLL_TIMEOUT_MS) {
        stopPolling();
        setPhase("error");
        setMessage("Обработчик не отвечает. Проверьте контейнер celery_worker.");
        return;
      }
      try {
        const status = await getOverdueReportStatus(taskId);
        if (status.state === "SUCCESS") {
          stopPolling();
          if (status.status === "empty") {
            setPhase("empty");
            setMessage("Просроченных постановлений нет");
          } else {
            setPhase("done");
            setMessage(`Готово: постановлений — ${status.count ?? 0}`);
            await loadLatest();
          }
        } else if (status.state === "FAILURE") {
          stopPolling();
          setPhase("error");
          setMessage("Не удалось сформировать отчёт");
        }
      } catch {
      }
    }, POLL_INTERVAL_MS);
  };

  const handleDownload = async (kind: OverdueFileKind, filename: string) => {
    try {
      saveBlob(await downloadOverdueFile(kind), filename);
    } catch (error) {
      alert(getErrorDetail(error, "Не удалось скачать файл"));
    }
  };

  const badgeClass: Record<Phase, string> = {
    idle: "badge badge-neutral",
    running: "badge badge-warning",
    done: "badge badge-success",
    empty: "badge badge-neutral",
    error: "badge badge-danger",
  };

  return (
    <div className="toolbar">
      <button
        className="btn btn-secondary btn-sm"
        style={{ width: "auto" }}
        onClick={handleStart}
        disabled={phase === "running"}
      >
        Сформировать реестр просроченных
      </button>

      {phase !== "idle" && <span className={badgeClass[phase]}>{message}</span>}

      {latest?.generated_at && (
        <>
          <span className="badge badge-neutral">Последний отчёт: {formatDateTime(latest.generated_at)}</span>
          {latest.excel_file && (
            <button
              className="btn btn-secondary btn-sm"
              style={{ width: "auto" }}
              onClick={() => handleDownload("excel", latest.excel_file as string)}
            >
              Скачать таблицу (Excel)
            </button>
          )}
          {latest.word_file && (
            <button
              className="btn btn-secondary btn-sm"
              style={{ width: "auto" }}
              onClick={() => handleDownload("word", latest.word_file as string)}
            >
              Скачать постановления (Word)
            </button>
          )}
        </>
      )}
    </div>
  );
}