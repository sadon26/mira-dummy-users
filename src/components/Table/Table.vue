<template>
  <div v-if="loading" class="py-20 px-22 flex justify-center items-center">
    <div class="flex items-center">
      <p>Loading...</p>
      <div class="loader" />
    </div>
  </div>
  <table v-else width="100%" class="table">
    <TableHeader :headers="headers" />
    <tbody v-if="!loading && !data.length">
      <tr>
        <td class="text-center" :colspan="headers.length">
          <p class="font-bold text-[20px] my-20">NO DATA AVAILABLE</p>
        </td>
      </tr>
    </tbody>

    <TableBody v-else :data="data" #default="{ row }">
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
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>

<style lang="scss" scoped>
.table {
  border-collapse: collapse;
}
</style>
