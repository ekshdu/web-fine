from services.report.word_report_builder import WordReportBuilder
from services.report.excel_report_builder import ExcelReportBuilder


class ReportService:
    def __init__(self):
        self._word_builder = WordReportBuilder()
        self._excel_builder = ExcelReportBuilder()

    def build_word_report(self, document_records: list[dict]) -> str:
        return self._word_builder.build(document_records)

    def build_excel_report(self, fines: list[dict]) -> str:
        return self._excel_builder.build(fines)