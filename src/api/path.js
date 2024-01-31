const backUrl = `${process.env.API_URL}`;

export default {
  backUrl,
  authEmailExist: "/auth/check-email?email=",
  authCreateUser: "/auth/signup",
  authLogin: "/auth/signin",
  authForgotPassword: "/auth/forgot-password?email=",
  authUpdatePassword: "/auth/update-password",
  authCheckToken: "/auth/refresh",
};
