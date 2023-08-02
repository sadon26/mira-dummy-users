<template>
  <tbody v-if="loading">
    <tr v-for="i in 5" :key="i">
      <td class="skeleton__item px-2 py-5" v-for="header in headers" :key="header.key" />
    </tr>
  </tbody>
</template>

<script setup lang="ts">
const { loading, headers } = defineProps(['loading', 'headers']);
</script>
