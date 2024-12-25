<script setup lang="ts">
definePageMeta({
  middleware: ["sanctum:auth"],
  title: "Update Profile",
});

const { updateProfile, errors } = useAuth();
const { refreshIdentity } = useSanctumAuth();
const user = useSanctumUser<User>();

const form = reactive<ProfileForm>({
  name: user.value?.name,
  email: user.value?.email,
});

const submit = async () => {
  await updateProfile(form);
  await refreshIdentity();
};
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Update Profile
      </h2>
      <div class="rounded-md bg-blue-50 p-4 mt-8">
        <div class="flex">
          <div class="ml-3 flex-1 md:flex md:justify-between">
            <p class="text-sm text-blue-700">
              Two factor authentication is
              <span>enabled</span>
              <!-- <span >disabled</span>. -->
            </p>
            <p class="mt-3 text-sm md:ml-6 md:mt-0">
              <NuxtLink
                class="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
              >
                Enable
                <span aria-hidden="true"> &rarr;</span>
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="submit">
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Name</label
          >
          <div class="mt-2">
            <input
              v-model="form.name"
              id="name"
              name="name"
              type="text"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              :class="{
                'text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300':
                  errors.name,
              }"
            />
          </div>
          <p
            v-if="errors.name"
            class="mt-2 text-sm text-red-600"
            id="email-error"
          >
            {{ errors.name[0] }}
          </p>
        </div>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Email address</label
          >
          <div class="mt-2">
            <input
              v-model="form.email"
              id="email"
              name="email"
              type="email"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              :class="{
                'text-red-900 focus:ring-red-500 focus:border-red-500 border-red-300':
                  errors.email,
              }"
            />
          </div>
          <p
            v-if="errors.email"
            class="mt-2 text-sm text-red-600"
            id="email-error"
          >
            {{ errors.email[0] }}
          </p>
        </div>
        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
