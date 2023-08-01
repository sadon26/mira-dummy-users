<template>
  <div v-if="isLoading" class="py-20 px-22 h-screen flex justify-center items-center">
    <div class="flex items-center">
      <p>Loading users</p>
      <div class="loader" />
    </div>
  </div>

  <div v-else class="py-20 px-22 h-screen overflow-y-scroll">
    <div class="flex justify-between items-center">
      <h3 class="text-[24px] font-medium">12 Customers</h3>
      <span>sdfsdf</span>
    </div>

    <Table :headers="UsersHeaders" mapKey="id" :data="users">
      <template #default="{ row }: { row: RowType }">
        <td class="p-3 border-t-1 flex items-center">
          <div class="user__img mr-4">
            <img :src="row.image" :alt="`${row.firstName} ${row.lastName}`" />
          </div>
          <span>{{ row.firstName }} {{ row.lastName }}</span>
        </td>
        <td class="p-3 border-t-1 font-semi-bold">{{ row.email }}</td>
        <td class="p-3 border-t-1" style="width: 55%">{{ moment(row.birthDate).fromNow() }}</td>
      </template>
    </Table>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { Table } from '../../components';
import { UsersHeaders } from '@/helpers/mocks';
import { RowType } from '@/helpers/types.interface';
import { useQuery } from '@/composables';
import { computed, reactive } from 'vue';
import { urlToSearchParams } from '../../helpers/functions';

const query = reactive({
  limit: 10
});

const url = 'https://dummyjson.com/users/';

const { data, isLoading } = useQuery({ url: urlToSearchParams(url, query) });

const users = computed(() => {
  return data?.users ?? [];
});
</script>

<style lang="scss" scoped>
.user__img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #cccccc45;

  & img {
    width: 100%;
    height: 100%;
  }
}
</style>
