import React, { useState } from "react";
import styles from "./ProfPageStatus.module.css";

const ProfPageStatus = () => {
  // Локальное состояние для каждого поля
  const [documentNumber, setDocumentNumber] = useState("");
  const [documentType, setDocumentType] = useState("");
  const [documentDate, setDocumentDate] = useState("");
  const [profileType, setProfileType] = useState("");

  const [editingField, setEditingField] = useState(null); // Поле, которое сейчас редактируется
  const [tempValue, setTempValue] = useState(""); // Временное значение для редактирования

  // Обработчик клика на поле
  const handleFieldClick = (field) => {
    setEditingField(field);
    setTempValue(
      field === "documentNumber"
        ? documentNumber
        : field === "documentType"
        ? documentType
        : field === "documentDate"
        ? documentDate
        : profileType
    );
  };

  // Сохранение данных
  const handleSave = () => {
    if (editingField === "documentNumber") setDocumentNumber(tempValue);
    else if (editingField === "documentType") setDocumentType(tempValue);
    else if (editingField === "documentDate") setDocumentDate(tempValue);
    else if (editingField === "profileType") setProfileType(tempValue);
    setEditingField(null);
  };

  // Отмена редактирования
  const handleCancel = () => {
    if (editingField === "documentNumber") setDocumentNumber("");
    else if (editingField === "documentType") setDocumentType("");
    else if (editingField === "documentDate") setDocumentDate("");
    else if (editingField === "profileType") setProfileType("");
    setEditingField(null);
  };

  return (
    <div className={styles.status}>
      <div className={styles.statusTop}>
        <div className={styles.statusTitle}>Статус личности</div>
        <div className={styles.unverifiedStatus}>Не верифицирован</div>
      </div>
      <div className={styles.statusBody}>
        {/* Левый столбец */}
        <div className={styles.column}>
          {/* Тип */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Тип</div>
            {editingField === "profileType" ? (
              <div className={styles.editContainer}>
                <input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className={styles.inputField}/>
                <button onClick={handleSave} className={styles.saveButton}>✔️</button>
                <button onClick={handleCancel} className={styles.cancelButton}>❌</button>
              </div> ) : (
              <div className={`${styles.fieldValue} ${ !profileType && styles.emptyField } ${profileType && styles.filled}`} onClick={() => handleFieldClick("profileType")}>
                {profileType || "Не заполнено"}
              </div>
            )}
          </div>

          {/* Тип документа */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Тип документа</div>
            {editingField === "documentType" ? (
              <div className={styles.editContainer}>
                <input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className={styles.inputField}/>
                <button onClick={handleSave} className={styles.saveButton}>✔️</button>
                <button onClick={handleCancel} className={styles.cancelButton}>❌</button>
              </div> ) : (
              <div className={`${styles.fieldValue} ${ !documentType && styles.emptyField } ${documentType && styles.filled}`} onClick={() => handleFieldClick("documentType")}>
                {documentType || "Не заполнено"}
              </div>
            )}
          </div>

          {/* Номер документа */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Номер документа</div>
            {editingField === "documentNumber" ? (
              <div className={styles.editContainer}>
                <input type="text" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className={styles.inputField}/>
                <button onClick={handleSave} className={styles.saveButton}>✔️</button>
                <button onClick={handleCancel} className={styles.cancelButton}>❌</button>
              </div> ) : (
              <div className={`${styles.fieldValue} ${ !documentNumber && styles.emptyField } ${documentNumber && styles.filled}`} onClick={() => handleFieldClick("documentNumber")}>
                {documentNumber || "Не заполнено"}
              </div>
            )}
          </div>
        </div>

        {/* Правый столбец */}
        <div className={styles.column}>
          {/* Дата */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Дата</div>
            {editingField === "documentDate" ? (
              <div className={styles.editContainer}>
                <input type="date" value={tempValue} onChange={(e) => setTempValue(e.target.value)} className={styles.inputField}/>
                <button onClick={handleSave} className={styles.saveButton}>✔️</button>
                <button onClick={handleCancel} className={styles.cancelButton}>❌</button>
              </div> ) : (
              <div className={`${styles.fieldValue} ${ !documentDate && styles.emptyField } ${documentDate && styles.filled}`} onClick={() => handleFieldClick("documentDate")}>
                {documentDate || "Не заполнено"}
              </div>
            )}
          </div>

          {/* Статус */}
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Статус</div>
            <div className={styles.unverifiedStatusBox}>Не верифицирован</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfPageStatus;