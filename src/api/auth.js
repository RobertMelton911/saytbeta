// src/api/auth.js
const API_BASE_URL = 'https://ваш-бэкенд-адрес'; // Замените на реальный URL вашего бэкенда

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = 'Ошибка регистрации';
      
      if (errorData.username && errorData.username.includes('already exists')) {
        errorMessage = 'Пользователь с таким именем уже существует';
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      let errorMessage = 'Ошибка входа';
      
      if (errorData.error === 'Invalid credentials') {
        errorMessage = 'Неверное имя пользователя или пароль';
      }
      
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Сохраняем данные аутентификации
export const saveAuthData = (data) => {
  localStorage.setItem('access_token', data.access);
  localStorage.setItem('refresh_token', data.refresh);
  localStorage.setItem('user', JSON.stringify(data.user));
};

// Проверка аутентификации
export const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};

// Получение текущего пользователя
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Выход из системы
export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};