import os
from datetime import datetime
from config import settings
from services.report.fine_documents import build_period_excel


class ExcelReportBuilder:
    def build(self, fines: list[dict]) -> str:
        """Таблица (реестр) просроченных постановлений."""
        content = build_period_excel(fines)
        os.makedirs(settings.reports_dir, exist_ok=True)
        filename = f"overdue_registry_{datetime.now().strftime('%Y%m%d_%H%M%S')}.xlsx"
        output_path = os.path.join(settings.reports_dir, filename)
        with open(output_path, "wb") as file:
            file.write(content)
        return output_path