<template>
  <div class="flex items-center search-box px-3">
    <div class="mr-2">
      <img :src="SearchIcon" alt="search-icon" />
    </div>
    <input v-model="inputText" v-bind="$attrs" class="search-input" type="search" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { SearchIcon } from '@/assets';

const emits = defineEmits(['update:modelValue']);
const { modelValue } = defineProps(['modelValue']);

const inputText = ref(modelValue ?? '');

watch(inputText, (newValue) => {
  emits('update:modelValue', newValue);
});
</script>

<style scoped lang="scss">
.search {
  &-box {
    border: 1px solid #e0e0e0;
    background: #f5f5f5;
    border-radius: 15px;
    height: 43px;
  }

  &-input {
    border: 1px solid transparent;
    background: transparent;
    border-radius: 15px;
    outline: none;
    flex: 1;

    &::placeholder {
      color: #b3b3b3;
    }
  }
}
</style>
