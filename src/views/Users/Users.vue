<template>
  <div v-if="isError" class="py-20 px-22">
    Error loading page. <button @click="reloadPage">Refresh</button>
  </div>
  <div v-else class="py-3-percent px-6-percent h-screen overflow-y-scroll fade-in">
    <div class="flex justify-between items-center flex-wrap mb-4">
      <h3 class="text-[18px] md:text-[24px] font-medium m-none">
        {{ formatNumberToText(data?.total ?? 0, 'Customer') }}
      </h3>
      <div class="search-box">
        <SearchInput placeholder="Search by item name..." v-model="searchValue" />
      </div>
    </div>

    <div class="w-full overflow-x-scroll">
      <Table :headers="UsersHeaders" mapKey="id" :data="data?.users ?? []" :loading="isLoading">
        <template #default="{ row }: { row: RowType }">
          <td class="p-3 border-t-1 flex text-[14px] md:text-[16px] items-center">
            <div class="user-img mr-4">
              <img :src="row.image" :alt="getFullName(row)" />
            </div>
            <span class="whitespace-nowrap">{{ getFullName(row) }}</span>
          </td>
          <td class="p-3 border-t-1 font-semi-bold text-[14px] md:text-[16px] whitespace-nowrap">
            {{ row.email }}
          </td>
          <td
            class="p-3 border-t-1 whitespace-nowrap text-[14px] md:text-[16px]"
            style="width: 55%"
          >
            {{ moment(row.birthDate).fromNow() }}
          </td>
        </template>
      </Table>
    </div>

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
import { UsersHeaders } from '@/helpers/mocks';
import { RowType } from '@/helpers/types.interface';
import { urlToSearchParams, formatNumberToText } from '@/helpers/functions';
import Pagination from 'v-pagination-3';

const searchValue = ref('');
const limit = 10;
const filters = reactive({ q: '', page: 1 } as { q: string; page: number });

useDebounce(searchValue as any, 1000, (input: any) => {
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

const { data, isLoading, isError, mutate: fetchUsers }: any = useQuery(URL.value);

const reloadPage = () => window.location.reload();

const getFullName = (row: RowType) => `${row.firstName} ${row.lastName}`;

watch(filters, () => {
  fetchUsers({ url: URL.value.url });
});
</script>

<style lang="scss" scoped>
.user-img {
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
  width: 250px;
  @media screen and (min-width: 768px) {
    width: 400px;
  }
  display: flex;
  align-self: stretch;
}
</style>
