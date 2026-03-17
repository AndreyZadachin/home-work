import { reactive, ref } from "vue";
import authService from "@/services/auth.service";
import {
  clearSession,
  getStoredToken,
  getStoredUsername,
  saveSession,
} from "@/utils/authStorage";

export const useAuth = () => {
  const isAuthenticated = ref(false);
  const isAuthLoading = ref(false);
  const currentUsername = ref("");
  const authError = ref("");
  const authForm = reactive({
    username: "",
    password: "",
  });

  const signInWithCredentials = (username, password) =>
    authService.signin({ username, password }).then((response) => {
      const token = response?.data?.accessToken;

      if (!token) {
        throw new Error("Token was not returned");
      }

      const userName = response?.data?.username || username;

      saveSession(token, userName);
      currentUsername.value = userName;
      isAuthenticated.value = true;
      authForm.password = "";
    });

  const restoreSession = (onAuthenticated) => {
    const token = getStoredToken();
    const savedUsername = getStoredUsername();

    if (!token) {
      return Promise.resolve();
    }

    currentUsername.value = savedUsername || "";

    return authService
      .verifySession()
      .then(() => {
        isAuthenticated.value = true;

        if (typeof onAuthenticated === "function") {
          return onAuthenticated();
        }
      })
      .catch((_error) => {
        logout();
      });
  };

  const submitAuth = (onAuthenticated) => {
    if (isAuthLoading.value) {
      return Promise.resolve();
    }

    authError.value = "";
    isAuthLoading.value = true;

    return signInWithCredentials(authForm.username, authForm.password)
      .then(() => {
        if (typeof onAuthenticated === "function") {
          return onAuthenticated();
        }
      })
      .catch((error) => {
        authError.value =
          error?.response?.data?.message || "Ошибка авторизации.";
      })
      .finally(() => {
        isAuthLoading.value = false;
      });
  };

  const logout = () => {
    clearSession();
    isAuthenticated.value = false;
    currentUsername.value = "";
    authForm.password = "";
  };

  return {
    isAuthenticated,
    isAuthLoading,
    currentUsername,
    authError,
    authForm,
    restoreSession,
    submitAuth,
    logout,
  };
};
