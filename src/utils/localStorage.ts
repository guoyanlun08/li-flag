// localStorage 相关操作

const SESSION_TOKEN = 'SESSION_TOKEN';

export function setToken(token: string) {
  return localStorage.setItem(SESSION_TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(SESSION_TOKEN);
}

export function removeToken() {
  return localStorage.removeItem(SESSION_TOKEN);
}
