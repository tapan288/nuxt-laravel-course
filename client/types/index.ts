declare global {
  interface User {
    id: string;
    name: string;
    email: string;
    created_at: string;
    two_factor_enabled: boolean;
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

  interface StudentForm {
    name: string;
    email: string;
    unit_id: string;
    section_id: string;
  }

  interface ConfirmPasswordForm {
    password: string;
  }

  interface ProfileForm {
    name: string;
    email: string;
  }

  interface CodeForm {
    code: string;
  }
}
