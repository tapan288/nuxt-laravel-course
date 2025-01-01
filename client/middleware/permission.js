export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSanctumUser();

  console.log(to.meta);
  //   if (to.meta && ) {
  //   const requiredPermission = to.meta.permission;

  // If the user doesn't have the required permission, redirect to unauthorized page
  if (!user.value?.permissions?.[to.meta.permission]) {
    return navigateTo("/unauthorized", { replace: true });
  }
  //   }
});
