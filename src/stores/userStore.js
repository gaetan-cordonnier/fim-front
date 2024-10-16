import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", {
  state: () => ({
    userId: null,
    userEmail: "",
    userFirstname: "",
    userLastname: "",
    userRole: "",
    userTheme: "",
    userIsRegistered: true,
  }),

  getters: {
    getUserMail(state) {
      return {
        email: state.userEmail,
      };
    },
    getUserIsRegistered(state) {
      return {
        isRegistered: state.userIsRegistered,
      };
    },
    getRegisterDetails(state) {
      return {
        email: state.userEmail,
        firstName: state.userFirstname,
        lastName: state.userLastname,
        role: state.userRole,
        theme: state.userTheme,
      };
    },
  },

  actions: {
    setUserMail(email) {
      this.userEmail = email;
    },
    setFirstname(firstname) {
      this.userFirstname = firstname;
    },
    setLastname(lastname) {
      this.userLastname = lastname;
    },
    setRole(role) {
      company === "" ? (role = null) : false;
      this.userRole = role;
    },
    setUserIsRegistered(isRegistered) {
      this.userIsRegistered = isRegistered;
    },
  },

  persist: {
    enabled: true,
  },
});
