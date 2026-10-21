import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import type { Car } from "../types/car";
import { getDriverCars, addCar, unlinkCar } from "../api/carApi";

interface DriverProfileModalProps {
  driverId: number;
  onClose: () => void;
}

const DriverProfileModal = ({ driverId, onClose }: DriverProfileModalProps): ReactElement => {
  const [cars, setCars] = useState<Car[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newCarNum, setNewCarNum] = useState("");
  const [newCarModel, setNewCarModel] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    loadCars();
  }, []);

  const loadCars = async () => {
    setIsLoading(true);
    try {
      const data = await getDriverCars(driverId);
      setCars(data);
    } catch {
      setErrorMessage("Не удалось загрузить список автомобилей");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCar = async () => {
    if (!newCarNum.trim()) {
      setErrorMessage("Введите госномер");
      return;
    }

    setIsAdding(true);
    setErrorMessage(null);
    try {
      const created = await addCar(driverId, {
        car_num: newCarNum.trim(),
        car_model: newCarModel.trim() || undefined,
      });
      setCars((previousCars) => [...previousCars, created]);
      setNewCarNum("");
      setNewCarModel("");
    } catch (error: any) {
      if (error?.response?.status === 409) {
        setErrorMessage("Автомобиль с таким госномером уже зарегистрирован");
      } else {
        setErrorMessage("Не удалось добавить автомобиль");
      }
    } finally {
      setIsAdding(false);
    }
  };

  const handleUnlink = async (carId: number) => {
    const confirmed = window.confirm("Отвязать этот автомобиль от профиля?");
    if (!confirmed) {
      return;
    }

    setErrorMessage(null);
    try {
      await unlinkCar(driverId, carId);
      setCars((previousCars) => previousCars.filter((car) => car.id !== carId));
    } catch (error: any) {
      if (error?.response?.status === 409) {
        setErrorMessage("Нельзя удалить автомобиль, по которому есть штрафы");
      } else {
        setErrorMessage("Не удалось отвязать автомобиль");
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">Мои автомобили</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {errorMessage && <div className="error-text">{errorMessage}</div>}

        {isLoading ? (
          <p>Загрузка...</p>
        ) : cars.length === 0 ? (
          <p>Автомобили не привязаны</p>
        ) : (
          <ul className="car-list">
            {cars.map((car) => (
              <li key={car.id} className="car-list-item">
                <span>{car.car_num} {car.car_model ? `(${car.car_model})` : ""}</span>
                <button className="btn btn-danger btn-sm" onClick={() => handleUnlink(car.id)}>Отвязать</button>
              </li>
            ))}
          </ul>
        )}

        <div className="add-car-form">
          <input
            className="input-field"
            type="text"
            placeholder="Госномер"
            value={newCarNum}
            onChange={(event) => setNewCarNum(event.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Модель (необязательно)"
            value={newCarModel}
            onChange={(event) => setNewCarModel(event.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddCar} disabled={isAdding}>
            {isAdding ? "Добавление..." : "Добавить авто"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default DriverProfileModal;