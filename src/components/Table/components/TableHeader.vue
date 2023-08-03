<template>
  <thead>
    <tr>
      <th
        v-for="header in headers"
        :key="header.key"
        :class="[
          'text-left text-[16px] whitespace-nowrap md:text-[20px] font-medium p-3 text-grey-black border-t-1',
          header.class
        ]"
      >
        {{ header.text }}
      </th>
    </tr>
  </thead>
</template>

<script setup lang="ts">
import { HeaderItem } from '@/helpers/types.interface';

defineProps({
  headers: {
    type: Array as () => HeaderItem[],
    required: true
  }
});
</script>

<style scoped></style>
