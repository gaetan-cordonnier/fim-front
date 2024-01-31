import { api } from "boot/axios";
import path from "src/api/path";

function getEmailExist(email) {
  return new Promise((resolve, reject) => {
    api
      .get(`${path.authEmailExist + email}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function createUser(firstname, email, password) {
  return new Promise((resolve, reject) => {
    api
      .post(path.authCreateUser, {
        firstname: firstname,
        email: email,
        password: password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function login(email, password) {
  return new Promise((resolve, reject) => {
    api
      .post(path.authLogin, {
        email: email,
        password: password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function forgotPassword(email) {
  return new Promise((resolve, reject) => {
    api
      .put(path.authForgotPassword + email)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function updatePassword(email, password) {
  return new Promise((resolve, reject) => {
    api
      .put(path.authUpdatePassword, {
        email: email,
        password: password,
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

function refreshToken(token) {
  const body = {
    token: token,
  };
  return new Promise((resolve, reject) => {
    api
      .post(path.authResetToken, body)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export {
  getEmailExist,
  createUser,
  login,
  forgotPassword,
  updatePassword,
  refreshToken,
};
