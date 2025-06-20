import React, { useReducer } from "react";
import styles from "./Registration.module.css";
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser, saveAuthData } from "../api/auth";

// Начальное состояние формы
const initialState = {
  activeTab: 'register',
  username: '',
  password: '',
  confirmPassword: '',
  isChecked: false,
  showPassword: false,
  showConfirmPassword: false,
  focusedField: null,
  isLoading: false,
  errors: {},
  successMessage: null
};

// Редуктор для управления состоянием
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SET_LOADING':
      return { ...state, isLoading: action.isLoading };
    case 'SET_SUCCESS_MESSAGE':
      return { ...state, successMessage: action.message };
    case 'RESET_FORM':
      return { 
        ...initialState, 
        activeTab: state.activeTab === 'register' ? 'login' : 'register',
        successMessage: null
      };
    case 'RESET_FOCUS':
      return { ...state, focusedField: null };
    default:
      return state;
  }
}

// Валидация формы
const validateForm = (state) => {
  const errors = {};
  
  if (!state.username) {
    errors.username = 'Имя пользователя обязательно';
  } else if (state.username.length < 3) {
    errors.username = 'Имя пользователя должно быть не менее 3 символов';
  }
  
  if (!state.password) {
    errors.password = 'Пароль обязателен';
  } else if (state.password.length < 6) {
    errors.password = 'Пароль должен быть не менее 6 символов';
  }
  
  if (state.activeTab === 'register') {
    if (!state.confirmPassword) {
      errors.confirmPassword = 'Подтвердите пароль';
    } else if (state.password !== state.confirmPassword) {
      errors.confirmPassword = 'Пароли не совпадают';
    }
    
    if (!state.isChecked) {
      errors.agreement = 'Необходимо принять соглашение';
    }
  }
  
  return errors;
};

const Registration = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();
  
  const {
    activeTab,
    username,
    password,
    confirmPassword,
    isChecked,
    showPassword,
    showConfirmPassword,
    focusedField,
    isLoading,
    errors,
    successMessage
  } = state;

  // Обработчик изменений полей
  const handleChange = (field, value) => {
    dispatch({ type: 'SET_FIELD', field, value });
    
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      dispatch({ type: 'SET_ERRORS', errors: newErrors });
    }
  };

  // Обработчик табов
  const handleTabClick = (tab) => {
    dispatch({ type: 'RESET_FORM' });
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация
    const formErrors = validateForm(state);
    if (Object.keys(formErrors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors: formErrors });
      return;
    }
    
    try {
      dispatch({ type: 'SET_LOADING', isLoading: true });
      
      let response;
      if (activeTab === 'register') {
        response = await registerUser(username, password);
      } else {
        response = await loginUser(username, password);
      }
      
      // Сохраняем данные аутентификации
      saveAuthData(response);
      
      const message = activeTab === 'register' 
        ? 'Регистрация прошла успешно!' 
        : 'Авторизация выполнена!';
      
      dispatch({ type: 'SET_SUCCESS_MESSAGE', message });
      
      // Очистка формы после успешного действия
      setTimeout(() => {
        dispatch({ 
          type: 'SET_FIELD', 
          field: 'successMessage', 
          value: null 
        });
        
        if (activeTab === 'login') {
          navigate('/profilepage');
        } else {
          dispatch({ type: 'RESET_FORM' });
        }
      }, 3000);
      
    } catch (error) {
      dispatch({ 
        type: 'SET_ERRORS', 
        errors: { form: error.message || 'Ошибка сервера. Попробуйте позже' } 
      });
    } finally {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }
  };

  // Обработчик видимости пароля
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      dispatch({ 
        type: 'SET_FIELD', 
        field: 'showPassword', 
        value: !showPassword 
      });
    } else {
      dispatch({ 
        type: 'SET_FIELD', 
        field: 'showConfirmPassword', 
        value: !showConfirmPassword 
      });
    }
  };

  return (
    <div className={styles.registration}>
      <div className={styles.tabsBtn}>
        <div 
          className={`${styles.tab} ${activeTab === 'register' ? styles.activeTab : styles.inactiveTab}`}
          onClick={() => handleTabClick('register')}
        >
          <b>РЕГИСТРАЦИЯ</b>
        </div>
        <div 
          className={`${styles.tab} ${activeTab === 'login' ? styles.activeTab : styles.inactiveTab}`}
          onClick={() => handleTabClick('login')}
        >
          <b>ВОЙТИ</b>
        </div>
      </div>
      <div className={styles.registrationContainer}>
        <form onSubmit={handleSubmit}>
          {/* Поле Имя пользователя */}
          <div className={`${styles.inputContainer} ${focusedField === 'username' ? styles.focused : ''}`}>
            <input 
              className={styles.input} 
              type="text" 
              value={username}
              onChange={(e) => handleChange('username', e.target.value)}
              placeholder="Имя пользователя"
              onFocus={() => dispatch({ type: 'SET_FIELD', field: 'focusedField', value: 'username' })}
              onBlur={() => dispatch({ type: 'RESET_FOCUS' })}
              disabled={isLoading}
            />
            {errors.username && <div className={styles.error}>{errors.username}</div>}
          </div>

          {/* Поле Пароль */}
          <div className={`${styles.inputContainer} ${focusedField === 'password' ? styles.focused : ''} ${styles.hasToggle}`}>
            <input 
              className={styles.input} 
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => handleChange('password', e.target.value)}
              placeholder="Пароль"
              onFocus={() => dispatch({ type: 'SET_FIELD', field: 'focusedField', value: 'password' })}
              onBlur={() => dispatch({ type: 'RESET_FOCUS' })}
              disabled={isLoading}
            />
            <button 
              type="button"
              className={styles.passwordToggle}
              onClick={() => togglePasswordVisibility('password')}
              tabIndex="-1"
              disabled={isLoading}
            >
              {showPassword ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M1 1l22 22M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                </svg>
              )}
            </button>
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>

          {/* Подтверждение пароля */}
          {activeTab === 'register' && (
            <div className={`${styles.inputContainer} ${focusedField === 'confirmPassword' ? styles.focused : ''} ${styles.hasToggle}`}>
              <input 
                className={styles.input} 
                type={showConfirmPassword ? "text" : "password"} 
                value={confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Подтвердите пароль"
                onFocus={() => dispatch({ type: 'SET_FIELD', field: 'focusedField', value: 'confirmPassword' })}
                onBlur={() => dispatch({ type: 'RESET_FOCUS' })}
                disabled={isLoading}
              />
              <button 
                type="button"
                className={styles.passwordToggle}
                onClick={() => togglePasswordVisibility('confirmPassword')}
                tabIndex="-1"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M1 1l22 22M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  </svg>
                )}
              </button>
              {errors.confirmPassword && <div className={styles.error}>{errors.confirmPassword}</div>}
            </div>
          )}

          {/* Чекбокс/Запомнить меня */}
          <div 
            className={styles.checkboxContainer} 
            onClick={() => !isLoading && handleChange('isChecked', !isChecked)}
          >
            <div className={styles.customCheckbox}>
              {isChecked && <div className={styles.checkmark}></div>}
            </div>
            <div className={styles.agreementTextContainer}>
              {activeTab === 'register' ? (
                <>
                  <span className={styles.agreementText}>Я прочитал и принял соглашение:</span>
                  <span 
                    className={styles.agreementLink} 
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Переход на страницу с договором");
                    }}
                  >
                    Договор о предоставлении услуг
                  </span>
                </>
              ) : (
                <span className={styles.agreementText}>Запомнить меня</span>
              )}
            </div>
          </div>
          {errors.agreement && <div className={styles.error}>{errors.agreement}</div>}

          {/* Кнопка отправки */}
          <button 
            type="submit"
            className={styles.submitButton}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              <b>{activeTab === 'register' ? 'РЕГИСТРАЦИЯ' : 'ВОЙТИ'}</b>
            )}
          </button>
        </form>

        {/* Сообщение об успехе */}
        {successMessage && (
          <div className={styles.successMessage}>
            {successMessage}
          </div>
        )}

        {/* Забыли пароль */}
        {activeTab === 'login' && (
          <div 
            className={styles.forgotPassword} 
            onClick={() => !isLoading && console.log("Забыли пароль")}
          >
            Забыли пароль?
          </div>
        )}

        {/* Сообщение об ошибке формы */}
        {errors.form && <div className={styles.formError}>{errors.form}</div>}
        
        {/* Альтернативный вход */}
        <div className={styles.divider}>
          {activeTab === 'register' ? 'Или зарегистрируйтесь через' : 'Или войдите через'}
        </div>

        {/* Кнопка Google */}
        <div 
          className={styles.googleButton} 
          onClick={() => !isLoading && console.log("Авторизация через Google")}
        >
          <img className={styles.googleIcon} alt="" src="/googlevec.svg" />
          <b>Google</b>
        </div>
      </div>
    </div>
  );
};

export default Registration;