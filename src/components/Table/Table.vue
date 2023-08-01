<template>
  <table width="100%">
    <TableHeader :headers="headers" />
    <TableBody :data="data" #default="{ row }">
      <slot :row="row" />
    </TableBody>
  </table>
</template>

<script setup lang="ts">
import { TableHeader, TableBody } from './components';
import { HeaderItem, TableDataItem } from '@/helpers/types.interface';

defineSlots<{
  default: 'default';
}>();

defineProps({
  headers: {
    type: Array as () => HeaderItem[],
    default: () => [],
    required: true
  },
  data: {
    type: Array as () => TableDataItem[],
    default: () => [],
    required: true
  }
});
</script>

<style lang="scss" scoped></style>
