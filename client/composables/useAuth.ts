export const useAuth = () => {
  const sanctumFetch = useSanctumClient(),
    errors = ref({});

  async function register(form: RegisterForm) {
    try {
      return await sanctumFetch("/register", {
        method: "POST",
        body: form,
      });
    } catch (error: any) {
      if (error.statusCode == 422) {
        errors.value = error.data.errors;
      }
    }
  }

  async function updateProfile(form: ProfileForm) {
    try {
      return await sanctumFetch("/user/profile-information", {
        method: "PUT",
        body: form,
      });
    } catch (error: any) {
      if (error.statusCode == 422) {
        errors.value = error.data.errors;
      }
    }
  }

  return { register, errors, updateProfile };
};
