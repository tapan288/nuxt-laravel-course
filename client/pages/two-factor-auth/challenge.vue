<script setup lang="ts">
definePageMeta({
  middleware: ["sanctum:guest"],
  title: "Confirm Two Factor Authentication",
});

const { confirmTwoFactor, errors } = useAuth();

const confirmTwoFactorForm = reactive<CodeForm>({
  code: "",
});

const submit = async () => {
  confirmTwoFactor(confirmTwoFactorForm).then(async (response) => {
    await navigateTo("/dashboard");
  });
};
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Confirm Two Factor Authentication
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submit">
        <div>
          <label
            for="code"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Enter Your 2FA Code</label
          >
          <div class="mt-2">
            <input
              v-model="confirmTwoFactorForm.code"
              id="code"
              name="code"
              type="text"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              :class="{
                'text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300':
                  errors.code,
              }"
            />
          </div>
          <p
            v-if="errors.code"
            class="mt-2 text-sm text-red-600"
            id="email-error"
          >
            {{ errors.code[0] }}
          </p>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Confirm 2FA
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
