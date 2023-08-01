<template>
  <div class="py-20 px-22 h-screen overflow-y-scroll fade-in">
    <div class="flex justify-between items-center">
      <h3 class="text-[24px] font-medium">{{ data?.total ?? 0 }} Customers</h3>
      <div class="search-box">
        <SearchInput placeholder="Search by item name..." v-model="searchValue" />
      </div>
    </div>

    <Table :headers="UsersHeaders" mapKey="id" :data="data?.users ?? []" :loading="isLoading">
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

    <Pagination
      v-if="!isLoading"
      v-model="filters.page"
      :records="data?.total ?? 0"
      :per-page="limit"
    />
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { Table, SearchInput } from '../../components';
import { UsersHeaders } from '@/helpers/mocks';
import { RowType } from '@/helpers/types.interface';
import { useQuery, useDebounce } from '@/composables';
import { computed, reactive, ref, watch } from 'vue';
import { urlToSearchParams } from '../../helpers/functions';
import Pagination from 'v-pagination-3';

const searchValue = ref('');
const limit = 10;
const filters = reactive({ q: '', page: 1 } as { q: string; page: number });

useDebounce(searchValue, 1000, (input: { value: string }) => {
  Object.assign(filters, { q: input.value, page: 1 });
});

const url = ref('https://dummyjson.com/users/');

const formattedURL: { value: string } = computed(() => {
  return filters.q ? `${url.value}search` : url.value;
});

let URL = computed(() => ({
  url: urlToSearchParams(formattedURL.value, {
    limit,
    ...filters,
    page: undefined,
    skip: (filters.page - 1) * 10
  })
}));

const { data, isLoading, mutate: fetchUsers } = useQuery(URL.value);

watch(filters, () => {
  fetchUsers({ url: URL.value.url });
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

.search-box {
  width: 400px;
}
</style>
