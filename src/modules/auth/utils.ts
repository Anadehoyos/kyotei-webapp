import Cookies from "js-cookie";

export function isAuthenticated(): boolean {
  return Cookies.get("auth_state") === "1";
}
