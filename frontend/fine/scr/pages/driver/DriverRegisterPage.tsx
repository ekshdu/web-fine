import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DriverRegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    surname: "", name: "", middle_name: "",
    plate: "", car_model: "", place_of_birth: "", date_of_birth: "",
    id_gender: "",
  });

  const set = (field: string) => (e: any) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const submit = () => {
    if (!form.surname || !form.name || !form.plate || !form.car_model) {
      alert("Заполните обязательные поля (ФИО, авто)");
      return;
    }
    // TODO: подключить POST /driver/register, когда появится эндпоинт на backend
    alert("Функция регистрации пока не подключена к серверу");
    console.log("Данные формы регистрации:", form);
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
            <option value="1">Мужской</option>
            <option value="2">Женский</option>
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

        <button className="btn btn-primary" onClick={submit}>Зарегистрироваться</button>
        <div className="spacer-top" />
        <button className="btn btn-secondary" onClick={() => navigate("/driver/login")}>Отмена</button>
      </div>
    </div>
  );
}