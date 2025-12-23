const DASHBOARD_PASSWORD = process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD || "changeme2025";
const AUTH_COOKIE_NAME = "dashboard_auth";
const AUTH_EXPIRY_DAYS = 7;

export const authService = {
  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    
    const authCookie = document.cookie
      .split("; ")
      .find(row => row.startsWith(`${AUTH_COOKIE_NAME}=`));
    
    return authCookie !== undefined;
  },

  authenticate: (password: string): boolean => {
    if (password === DASHBOARD_PASSWORD) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + AUTH_EXPIRY_DAYS);
      
      document.cookie = `${AUTH_COOKIE_NAME}=true; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict; Secure`;
      return true;
    }
    return false;
  },

  logout: (): void => {
    if (typeof window === "undefined") return;
    document.cookie = `${AUTH_COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  },
};
