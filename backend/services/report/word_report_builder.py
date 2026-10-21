import os
from datetime import datetime
from config import settings
from services.report.fine_documents import build_combined_word


class WordReportBuilder:
    def build(self, records: list[dict]) -> str:
        """Один Word-документ со всеми постановлениями из списка."""
        content = build_combined_word(records)
        os.makedirs(settings.reports_dir, exist_ok=True)
        filename = f"overdue_postanovleniya_{datetime.now().strftime('%Y%m%d_%H%M%S')}.docx"
        output_path = os.path.join(settings.reports_dir, filename)
        with open(output_path, "wb") as file:
            file.write(content)
        return output_path