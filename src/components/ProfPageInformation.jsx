import React, { useState } from "react";
import styles from "./ProfPageInformation.module.css";

const ProfPageInformation = () => {
  // Локальное состояние для каждого поля
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [editingField, setEditingField] = useState(null); // Поле, которое сейчас редактируется
  const [tempValue, setTempValue] = useState(""); // Временное значение для редактирования

  // Обработчик клика на поле
  const handleFieldClick = (field) => {
    setEditingField(field);
    setTempValue(
      field === "name"
        ? name
        : field === "surname"
        ? surname
        : field === "email"
        ? email
        : field === "phone"
        ? phone
        : birthDate
    );
  };

  // Сохранение данных
  const handleSave = () => {
    if (editingField === "name") setName(tempValue);
    else if (editingField === "surname") setSurname(tempValue);
    else if (editingField === "email") setEmail(tempValue);
    else if (editingField === "phone") setPhone(tempValue);
    else if (editingField === "birthDate") setBirthDate(tempValue);
    setEditingField(null);
  };

  // Отмена редактирования
  const handleCancel = () => {
    if (editingField === "name") setName("");
    else if (editingField === "surname") setSurname("");
    else if (editingField === "email") setEmail("");
    else if (editingField === "phone") setPhone("");
    else if (editingField === "birthDate") setBirthDate("");
    setEditingField(null);
  };

  return (
    <div className={styles.information}>
      <div className={styles.informationTop}>
        <div className={styles.informationTitle}>Информация о личности</div>
      </div>
      <div className={styles.informationBody}>
        {/* Левый столбец */}
        <div className={styles.column}>
          {/* Имя */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Имя *</div>
            {editingField === "name" ? (
              <div className={styles.editContainer}>
                <input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className={styles.inputField}/>
                <button onClick={handleSave} className={styles.saveButton}>✔️</button>
                <button onClick={handleCancel} className={styles.cancelButton}>❌</button>
              </div> ) : (
              <div className={`${styles.fieldValue} ${ !name && styles.emptyField } ${name && styles.filled}`} onClick={() => handleFieldClick("name")}>
                {name || "Не заполнено"}
              </div>
            )}
          </div>

          {/* Email */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Email</div>
            {editingField === "email" ? (
              <div className={styles.editContainer}>
                <input type="email" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className={styles.inputField}/>
                <button onClick={handleSave} className={styles.saveButton}>✔️</button>
                <button onClick={handleCancel} className={styles.cancelButton}>❌</button>
              </div> ) : (
              <div
                className={`${styles.fieldValue} ${ !email && styles.emptyField } ${email && styles.filled}`} onClick={() => handleFieldClick("email")}>
                {email || "Не заполнено"}
              </div>
            )}
          </div>

          {/* Дата рождения */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Дата рождения *</div>
            {editingField === "birthDate" ? (
              <div className={styles.editContainer}>
                <input type="date" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className={styles.inputField}/>
                <button onClick={handleSave} className={styles.saveButton}>✔️</button>
                <button onClick={handleCancel} className={styles.cancelButton}>❌</button>
              </div> ) : (
              <div className={`${styles.fieldValue} ${ !birthDate && styles.emptyField } ${birthDate && styles.filled}`} onClick={() => handleFieldClick("birthDate")}>
                {birthDate || "Не заполнено"}
              </div>
            )}
          </div>
        </div>

        {/* Правый столбец */}
        <div className={styles.column}>
          {/* Фамилия */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Фамилия *</div>
            {editingField === "surname" ? (
              <div className={styles.editContainer}>
                <input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className={styles.inputField}/>
                <button onClick={handleSave} className={styles.saveButton}>✔️</button>
                <button onClick={handleCancel} className={styles.cancelButton}>❌</button>
              </div> ) : (
              <div className={`${styles.fieldValue} ${ !surname && styles.emptyField } ${surname && styles.filled}`} onClick={() => handleFieldClick("surname")}>
                {surname || "Не заполнено"}
              </div>
            )}
          </div>

          {/* Телефон */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Телефон</div>
            {editingField === "phone" ? (
              <div className={styles.editContainer}>
                <input type="tel" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className={styles.inputField} />
                <button onClick={handleSave} className={styles.saveButton}>✔️</button>
                <button onClick={handleCancel} className={styles.cancelButton}>❌</button>
              </div> ) : (
              <div className={`${styles.fieldValue} ${ !phone && styles.emptyField } ${phone && styles.filled}`} onClick={() => handleFieldClick("phone")}>
                {phone || "Не заполнено"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfPageInformation;