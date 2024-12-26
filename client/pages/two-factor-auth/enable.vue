<script setup lang="ts">
definePageMeta({
  middleware: ["sanctum:auth"],
  title: "Enable Two Factor Authentication",
});

const { confirmPassword, errors } = useAuth();

const confirmPasswordForm = reactive<ConfirmPasswordForm>({
  password: "",
});

const submit = async () => {
  confirmPassword(confirmPasswordForm).then((response) => {
    console.log(response);
  });
};
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Confirm Password
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submit">
        <div>
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
          <div class="mt-2">
            <input
              v-model="confirmPasswordForm.password"
              id="password"
              name="password"
              type="password"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              :class="{
                'text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300':
                  errors.password,
              }"
            />
          </div>
          <p
            v-if="errors.password"
            class="mt-2 text-sm text-red-600"
            id="email-error"
          >
            {{ errors.password[0] }}
          </p>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Confirm Password
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
