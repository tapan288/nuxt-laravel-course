<script setup lang="ts">
definePageMeta({
  middleware: ["sanctum:auth"],
  title: "Dashboard",
});
</script>

<template>
  <div>Dashboard</div>
</template>
