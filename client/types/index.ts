declare global {
  interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
  }

  interface LoginForm {
    email: string;
    password: string;
  }

  interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  }
}
