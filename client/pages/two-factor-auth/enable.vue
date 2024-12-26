<script setup lang="ts">
definePageMeta({
  middleware: ["sanctum:auth"],
  title: "Enable Two Factor Authentication",
});

const {
  confirmPassword,
  errors,
  enableTwoFactor,
  submitCode: submitCodeAction,
} = useAuth();

let svg = reactive({
  qrCode: "",
});

const codeForm = reactive<CodeForm>({
  code: "",
});

const confirmPasswordForm = reactive<ConfirmPasswordForm>({
  password: "",
});

const submit = async () => {
  confirmPassword(confirmPasswordForm).then((response) => {
    if (response.status == 201) {
      enableTwoFactor().then((qrCodeResponse) => {
        svg.qrCode = qrCodeResponse.svg;
      });
    }
  });
};

const submitCode = async () => {
  submitCodeAction(codeForm).then(async (response) => {
    await navigateTo("/account");
  });
};
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <template v-if="!svg.qrCode">
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
    </template>

    <template v-if="svg.qrCode">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          Enable Two Factor Authentication
        </h2>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="flex justify-center items-center">
          <div v-html="svg.qrCode"></div>
        </div>
        <div class="mt-2">
          <p class="py-1">
            Scan the QR code above using your phone's authenticator app.
          </p>
          <p class="py-1">And enter the code below.</p>
        </div>
        <form class="space-y-6" @submit.prevent="submitCode">
          <div>
            <label
              for="code"
              class="block text-sm font-medium leading-6 text-gray-900"
              >Enter Your Code</label
            >
            <div class="mt-2">
              <input
                v-model="codeForm.code"
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
              Enable Two Factor Authentication
            </button>
          </div>
        </form>
      </div>
    </template>
  </div>
</template>
