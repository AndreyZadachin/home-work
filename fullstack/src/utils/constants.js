export const TODOS_ENDPOINT = process.env.VUE_APP_TODOS_ENDPOINT || "/todos";
export const SIGNIN_ENDPOINT =
  process.env.VUE_APP_AUTH_SIGNIN_ENDPOINT || "/auth/signin";
export const AUTH_VERIFY_ENDPOINT =
  process.env.VUE_APP_AUTH_VERIFY_ENDPOINT || "/user";
export const AUTH_TOKEN_KEY =
  process.env.VUE_APP_AUTH_TOKEN_KEY || "accessToken";
export const AUTH_USER_KEY = process.env.VUE_APP_AUTH_USER_KEY || "authUsername";
