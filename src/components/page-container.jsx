import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./page-container.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";

// URL для будущей интеграции с API
const API_ENDPOINTS = {
    login: "", // здесь будет URL для входа
    register: "", // здесь будет URL для регистрации
};


const PageContainer = ({ className = "", onLoginSuccess = () => {} }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Определяем начальный режим из URL параметра
  const initialMode = searchParams.get("mode") === "register" ? "register" : "login";
  
  // Состояния формы
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [isAgreed, setIsAgreed] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(initialMode === "login");

  // Синхронизация режима при изменении URL параметра
  useEffect(() => {
    const currentMode = searchParams.get("mode") === "register" ? "register" : "login";
    setIsLoginMode(currentMode === "login");
  }, [searchParams]);

  // Валидация email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Валидация пароля
  const validatePassword = (password) => {
    return password.length >= 8;
  };

  // Сброс ошибок при изменении формы
  useEffect(() => {
    if (formError) setFormError("");
    if (formSuccess) setFormSuccess("");
  }, [formData, isAgreed, isLoginMode]);

  // Обработчики изменения полей
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Обработчик отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Валидация формы
    if (!formData.email || !formData.password) {
      setFormError("Пожалуйста, заполните все обязательные поля");
      return;
    }
    
    if (!validateEmail(formData.email)) {
      setFormError("Пожалуйста, введите корректный email");
      return;
    }
    
    if (!isLoginMode && !validatePassword(formData.password)) {
      setFormError("Пароль должен содержать минимум 8 символов");
      return;
    }
    
    if (!isLoginMode && formData.password !== formData.confirmPassword) {
      setFormError("Пароли не совпадают");
      return;
    }
    
    if (!isLoginMode && !isAgreed) {
      setFormError("Необходимо принять условия соглашения");
      return;
    }
    
    setFormError("");
    setIsLoading(true);
    
    try {
      // Имитация запроса на сервер
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log(`${isLoginMode ? "Вход" : "Регистрация"}`, formData);
      setFormSuccess(isLoginMode 
        ? "Вход выполнен успешно!" 
        : "Регистрация успешно завершена!");
      
      // Вызов колбэка успешного входа
      onLoginSuccess();
      
      // Сброс формы после успешной регистрации
      if (!isLoginMode) {
        setFormData({
          email: "",
          password: "",
          confirmPassword: ""
        });
        setIsAgreed(false);
      }
    } catch (error) {
      setFormError("Произошла ошибка при обработке запроса");
      console.error("Ошибка запроса:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Переключение видимости пароля
  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  // Переключение между режимами входа и регистрации с обновлением URL
  const toggleMode = () => {
    const newMode = isLoginMode ? "register" : "login";
    navigate(`?mode=${newMode}`, { replace: true });
    setFormData({
      email: "",
      password: "",
      confirmPassword: ""
    });
    setFormError("");
    setFormSuccess("");
    setIsAgreed(false);
  };

  return (
    <form className={`${styles.pageContainer} ${className}`} onSubmit={handleSubmit}>
      {/* Заголовок и верхняя часть */}
      <div className={styles.authContainer}>
        <div className={styles.authInnerContainer} onClick={() => navigate("/")}>
          <img
            className={styles.spacerIcon}
            loading="lazy"
            alt=""
            src="/vector-arro.svg"
          />
        </div>
        <div className={styles.registrationFormParent}>
          <div className={styles.registrationForm}>
            <img
              className={styles.spacerIcon1}
              loading="lazy"
              alt=""
              src="/vector-1.svg"
            />
          </div>
          <div className={styles.credentials}>
            <div className={styles.registrationLabel}>
              <h1 className={styles.h1}>{isLoginMode ? "Вход" : "Регистрация"}</h1>
            </div>
            <div className={styles.loginLabel}>
              <div className={styles.div}>
                {isLoginMode ? "Еще нет аккаунта?" : "Уже зарегистрированы?"}
              </div>
              <div 
                className={styles.registrationBtn} 
                onClick={toggleMode}
                role="button"
                tabIndex={0}
              >
                <div className={styles.div1}>{isLoginMode ? "Регистрация" : "Войти"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Сообщение об ошибке или успехе */}
      {formError && <div className={styles.formError}>{formError}</div>}
      {formSuccess && <div className={styles.formSuccess}>{formSuccess}</div>}
      
      {/* Поле Email */}
      <div className={styles.emailInput}>
        <div className={styles.stringEmail}>
          <input 
            className={styles.email} 
            placeholder="Email *" 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      
      {/* Поле пароля */}
      <div className={styles.credentials}>
        <div className={styles.stringPassword}>
          <input 
            className={styles.input} 
            placeholder="Пароль *" 
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button 
            type="button" 
            className={styles.passwordToggle}
            onClick={() => togglePasswordVisibility('password')}
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? "👁️‍🗨️" : "👁️"}
          </button>
        </div>
        
        {/* Поле подтверждения пароля (только для регистрации) */}
        {!isLoginMode && (
          <div className={styles.stringPassword}>
            <input 
              className={styles.input} 
              placeholder="Подтвердите пароль *" 
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <button 
              type="button" 
              className={styles.passwordToggle}
              onClick={() => togglePasswordVisibility('confirmPassword')}
              aria-label={showConfirmPassword ? "Скрыть пароль" : "Показать пароль"}
            >
              {showConfirmPassword ? "👁️‍🗨️" : "👁️"}
            </button>
          </div>
        )}
        
        {/* Чекбокс согласия (только для регистрации) */}
        {!isLoginMode && (
          <div className={styles.agreement}>
            <div className={styles.agreementInner}>
              <input 
                className={styles.agreementCheckbox} 
                type="checkbox"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                id="agreementCheckbox"
              />
              <div className={styles.loginTreaty}>
                <label htmlFor="agreementCheckbox" className={styles.div2}>
                  Я прочитал и принял соглашение:
                </label>
                <div className={styles.div3}>Договор о предоставлении услуг</div>
              </div>
            </div>
          </div>
        )}
        
        {/* Ссылка на восстановление пароля (только для входа) */}
        {isLoginMode && (
          <div className={styles.forgotPassword}>
            <div 
              className={styles.resetPasswordLink}
              role="button"
              tabIndex={0}
              onClick={() => console.log("Запрос на восстановление пароля")}
            >
              Забыли пароль?
            </div>
          </div>
        )}
      </div>
      
      {/* Кнопка действия (Вход/Регистрация) */}
      <div className={styles.registrationButton}>
        <button 
          className={styles.enterBtn} 
          type="submit"
          disabled={isLoading}
        >
          <b className={styles.b}>
            {isLoading 
              ? "ЗАГРУЗКА..." 
              : isLoginMode ? "ВОЙТИ" : "РЕГИСТРАЦИЯ"
            }
          </b>
        </button>
      </div>
      
      {/* Разделитель "или" */}
      <div className={styles.dividerContainerWrapper}>
        <div className={styles.dividerContainer}>
          <div className={styles.divider}>
            <div className={styles.horizontalDivider} />
          </div>
          <div className={styles.div4}>или</div>
          <div className={styles.divider}>
            <div className={styles.horizontalDivider} />
          </div>
        </div>
      </div>
      
      {/* Кнопка входа через Google */}
      <div className={styles.dividerContainerWrapper}>
        <button 
          className={styles.googleBtn} 
          type="button"
          onClick={() => console.log("Google авторизация")}
        >
          <img
            className={styles.googleBtnImgIcon}
            alt="Google"
            src="/googlebtnimg.svg"
          />
          <div className={styles.google}>
            {isLoginMode ? "Вход через аккаунт Google" : "Регистрация через Google"}
          </div>
        </button>
      </div>
    </form>
  );
};

PageContainer.propTypes = {
  className: PropTypes.string,
  onLoginSuccess: PropTypes.func
};

export default PageContainer;