import api from "@/services/api";
import { AUTH_VERIFY_ENDPOINT, SIGNIN_ENDPOINT } from "@/utils/constants";

class AuthService {
  signin(credentials) {
    return api.post(SIGNIN_ENDPOINT, credentials);
  }

  verifySession() {
    return api.get(AUTH_VERIFY_ENDPOINT);
  }
}

export default new AuthService();
