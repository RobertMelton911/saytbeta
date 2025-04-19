import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import FirstPage from "./pages/first-page";
import SecondPage from "./pages/second-page";
import ThirdPage from "./pages/third-page";
import ProfilePage from "./pages/profile-page";
import GrafPage from "./pages/graf-page";
import LoginPage from "./pages/login-page";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/login":
        title = "Авторизация | Мой Брокер";
        metaDescription = "Страница входа и регистрации пользователя на сайте Мой Брокер.";
        break;
      case "/":
        title = "Главная страница | Мой Брокер";
        metaDescription = "Добро пожаловать на главную страницу сайта брокера. Узнайте больше о нас.";
        break;
      case "/thirdpage":
        title = "Третья страница | Мой Брокер";
        metaDescription = "Описание услуг и возможностей нашего сервиса на третьей странице.";
        break;
      case "/profilepage":
        title = "Профиль пользователя | Мой Брокер";
        metaDescription = "Управляйте своим профилем на странице профиля.";
        break;
      case "/grafpage":
        title = "График | Мой Брокер";
        metaDescription = "Анализируйте данные и графики для принятия решений.";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<FirstPage />} />
      <Route path="/secondpage" element={<SecondPage />} />
      <Route path="/thirdpage" element={<ThirdPage />} />
      <Route path="/grafpage" element={<GrafPage />} />
      <Route path="/profilepage" element={<ProfilePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;