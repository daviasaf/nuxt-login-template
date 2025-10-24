// shared/types/auth.d.ts
declare module "#auth-utils" {
  interface User {
    id: number;
    name: string;
  }

  interface UserSession {
    lastLoggedIn: Date;
  }
}

export {};
