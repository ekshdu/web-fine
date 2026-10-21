from repositories.reference_repository import ReferenceRepository


class ReferenceService:
    def __init__(self, repository: ReferenceRepository):
        self.repository = repository

    def get_all_references(self) -> dict:
        return {
            "statuses": self.repository.get_statuses(),
            "fine_sums": self.repository.get_fine_sums(),
            "fine_sections": self.repository.get_fine_sections(),
            "fine_speeds": self.repository.get_fine_speeds(),
        }