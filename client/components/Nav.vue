<script setup lang="ts">
const { isAuthenticated, logout: logoutAction } = useSanctumAuth();
const user = useSanctumUser<User>();

const logout = async () => {
  await logoutAction();
  //   await navigateTo("/");
};
</script>
<template>
  <header class="bg-white">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
    >
      <div class="flex items-center gap-x-12">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="text-xl font-bold"> Product Name </span>
        </a>
        <div class="hidden lg:flex lg:gap-x-12">
          <NuxtLink
            v-if="isAuthenticated"
            to="/dashboard"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Dashboard
          </NuxtLink>
          <NuxtLink
            v-if="user?.permissions?.student_list"
            to="/students"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Students
          </NuxtLink>
        </div>
      </div>
      <div class="flex lg:hidden">
        <button
          type="button"
          class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex">
        <div class="flex items-center space-x-6" v-if="isAuthenticated">
          <NuxtLink
            to="/account"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            {{ user.name }}
          </NuxtLink>
          <button
            @click="logout"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Log out &rarr;
          </button>
        </div>
        <div v-if="!isAuthenticated">
          <NuxtLink
            to="/auth/login"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in &rarr;
          </NuxtLink>
          <NuxtLink
            to="/auth/register"
            class="text-sm font-semibold leading-6 text-gray-900"
          >
            Register &rarr;
          </NuxtLink>
        </div>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div class="lg:hidden">
      <div
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:ring-1 sm:ring-gray-900/10"
      >
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="text-xl font-bold"> Product Name </span>
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700">
            <span class="sr-only">Close menu</span>
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <a
                href="#"
                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Dashboard
              </a>
            </div>
            <div class="py-6">
              <div>
                <button
                  class="w-full text-left -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log out
                </button>
              </div>
              <div>
                <a
                  href="#"
                  class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
