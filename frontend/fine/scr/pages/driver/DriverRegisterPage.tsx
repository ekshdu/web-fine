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
    alert("Функция регистрации пока не подключена к серверу");
    console.log("Данные формы регистрации:", form);
  };
  return (
    <div className="centered-page">
      <h1>РЕГИСТРАЦИЯ</h1>
      <input className="input-field" placeholder="Фамилия" value={form.surname} onChange={set("surname")} />
      <input className="input-field" placeholder="Имя" value={form.name} onChange={set("name")} />
      <input className="input-field" placeholder="Отчество" value={form.middle_name} onChange={set("middle_name")} />
      <select className="input-field" value={form.id_gender} onChange={set("id_gender")}>
        <option value="">Пол</option>
        <option value="1">Мужской</option>
        <option value="2">Женский</option>
      </select>
      <input className="input-field" placeholder="Госномер" value={form.plate} onChange={set("plate")} />
      <input className="input-field" placeholder="Модель авто" value={form.car_model} onChange={set("car_model")} />
      <input className="input-field" placeholder="Место рождения" value={form.place_of_birth} onChange={set("place_of_birth")} />
      <input className="input-field" type="date" value={form.date_of_birth} onChange={set("date_of_birth")} />
      <button className="btn-primary" onClick={submit}>Зарегистрироваться</button>
      <button className="btn-secondary" onClick={() => navigate("/driver/login")}>Отмена</button>
    </div>
  );
}