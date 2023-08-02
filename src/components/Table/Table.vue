<template>
  <table width="100%" class="table">
    <TableHeader :headers="headers" />
    <TableLoader v-if="loading" :headers="headers" :loading="loading" />
    <tbody v-else-if="!loading && !data.length">
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
import { TableHeader, TableBody, TableLoader } from './components';
import { HeaderItem, TableDataItem } from '../../helpers/types.interface';

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
