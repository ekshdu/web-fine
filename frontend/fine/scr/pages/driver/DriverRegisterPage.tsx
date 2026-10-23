import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getGenders, registerDriver } from "../../api/driverApi";
import type { Gender } from "../../types";
import { getErrorDetail } from "../../utils";

type FormField =
  | "surname" | "name" | "middle_name" | "plate" | "car_model"
  | "place_of_birth" | "date_of_birth" | "id_gender";

export default function DriverRegisterPage() {
  const navigate = useNavigate();
  const [genders, setGenders] = useState<Gender[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Record<FormField, string>>({
    surname: "", name: "", middle_name: "",
    plate: "", car_model: "", place_of_birth: "", date_of_birth: "",
    id_gender: "",
  });

  useEffect(() => {
    getGenders()
      .then(setGenders)
      .catch(() => setError("Не удалось загрузить список полов. Проверьте, что сервер доступен."));
  }, []);

  const set = (field: FormField) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: field === "plate" ? e.target.value.toUpperCase() : e.target.value }));

  const submit = async () => {
    setError("");
    if (!form.surname.trim() || !form.name.trim() || !form.plate.trim() || !form.car_model.trim()) {
      setError("Заполните обязательные поля (ФИО, авто)");
      return;
    }

    setLoading(true);
    try {
      await registerDriver({
        surname: form.surname.trim(),
        name: form.name.trim(),
        middle_name: form.middle_name.trim() || null,
        plate: form.plate.trim(),
        car_model: form.car_model.trim(),
        id_gender: form.id_gender ? Number(form.id_gender) : null,
        place_of_birth: form.place_of_birth.trim() || null,
        date_of_birth: form.date_of_birth || null,
      });
      alert("Регистрация прошла успешно. Теперь войдите по госномеру.");
      navigate("/driver/login");
    } catch (err) {
      setError(getErrorDetail(err, "Не удалось зарегистрироваться. Проверьте соединение с сервером."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="centered-page">
      <div className="auth-box" style={{ maxWidth: 440 }}>
        <div className="auth-icon">+</div>
        <h1>Регистрация водителя</h1>

        <div className="form-group">
          <label className="form-label">Фамилия *</label>
          <input className="input-field" value={form.surname} onChange={set("surname")} />
        </div>
        <div className="form-group">
          <label className="form-label">Имя *</label>
          <input className="input-field" value={form.name} onChange={set("name")} />
        </div>
        <div className="form-group">
          <label className="form-label">Отчество</label>
          <input className="input-field" value={form.middle_name} onChange={set("middle_name")} />
        </div>
        <div className="form-group">
          <label className="form-label">Пол</label>
          <select className="input-field" value={form.id_gender} onChange={set("id_gender")}>
            <option value="">Не выбрано</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>{gender.name}</option>
            ))}
          </select>
        </div>

        <div className="divider" />

        <div className="form-group">
          <label className="form-label">Госномер *</label>
          <input className="input-field" placeholder="А123АА77" value={form.plate} onChange={set("plate")} />
        </div>
        <div className="form-group">
          <label className="form-label">Модель авто *</label>
          <input className="input-field" placeholder="Toyota Camry" value={form.car_model} onChange={set("car_model")} />
        </div>
        <div className="form-group">
          <label className="form-label">Место рождения</label>
          <input className="input-field" value={form.place_of_birth} onChange={set("place_of_birth")} />
        </div>
        <div className="form-group">
          <label className="form-label">Дата рождения</label>
          <input className="input-field" type="date" value={form.date_of_birth} onChange={set("date_of_birth")} />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="btn btn-primary" onClick={submit} disabled={loading}>
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
        <div className="spacer-top" />
        <button className="btn btn-secondary" onClick={() => navigate("/driver/login")}>Отмена</button>
      </div>
    </div>
  );
}