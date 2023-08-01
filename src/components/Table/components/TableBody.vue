<template>
  <tbody>
    <tr v-for="row in data" :key="(row as any)?.[mapKey]">
      <slot :row="row" />
    </tr>
  </tbody>
</template>

<script setup lang="ts">
defineSlots<{
  default: 'default';
}>();

defineProps({
  data: {
    type: Array,
    required: true
  },
  mapKey: {
    type: String,
    default: 'id'
  }
});
</script>

<style scoped></style>
