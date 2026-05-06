import { cookies } from "next/headers";

export default class CookieConfig {
  token: string | undefined;
  constructor() {
    this.token = "";
  }

  getToken = async (cookieName: string) => {
    try {
      const cookiesList = await cookies();
      const hasCookie = cookiesList.has(cookieName);
      
      if (hasCookie) {
        const cookieStore = await cookies();
        this.token = cookieStore.get(cookieName)?.value;
      }
      return this.token;
    } catch {
      return "";
    }
  };

  setToken = async (cookieName: string, value: string) => {
    try {
      const cookieStore = await cookies();
      console.log(value);
      cookieStore.set(cookieName, value);
    } catch {
      return "";
    }
  };

  deleteCookie = async (cookieName: string) => {
    try {
      const cookieStore = await cookies();
      cookieStore.delete("jwt");
    } catch (e) {
      console.log(e);
    }
  };
}
