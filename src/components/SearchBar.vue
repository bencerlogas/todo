<template>
  <div>
    <div class="flex border-2 border-black rounded-md h-[68px] items-center p-[17px] space-x-[16px]">
      <img src="../assets/SearchButton.svg" />
      <input
        v-model="searchBar"
        placeholder="Search todos..."
        class="box-border w-[100%] focus:outline-none text-[18px]"
      />
      <button @click="searchInput(searchBar)" class="bg-black text-white rounded-md text-center p-[4px]">Search</button>
    </div>
    <div class="flex justify-between mt-6 gap-4">
      <div class="flex justify-start gap-4">
        <div v-for="(orderbtn, date) in orderbtns" :key="date">
          <button
            @click="orderData(orderbtn)"
            class="border-2 border-black rounded-md"
            :class="orderByOptions.includes(orderbtn.key) ? 'bg-green-50 text-white' : ''"
          >
            {{ orderbtn.name }}
          </button>
        </div>
      </div>
      <div class="flex gap-x-4">
        <button
          @click="descAsc(sortorder[0])"
          :class="sortBy === 'asc' ? 'bg-green-50 text-white' : ''"
          class="border-2 border-black rounded-md"
        >
          ↓
        </button>
        <button
          @click="descAsc(sortorder[1])"
          :class="sortBy === 'desc' ? 'bg-black text-white ' : ''"
          class="border-2 border-black rounded-md"
        >
          ↑
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['update:modelValue', 'update:orderBy', 'update:sortDirection', 'update:sortBy']);
const props = defineProps({
  modelValue: { type: String, default: '' },
  orderBy: { type: Object, default: () => ({}) },
  sortBy: { type: String, default: '' },
});

const orderByOptions = ref(props.orderBy);

const orderbtns = ref([
  { name: 'Title', key: 'title', active: false },
  { name: 'Description', key: 'text', active: false },
  { name: 'Priority', key: 'priority', active: false },
]);

const sortorder = ref(['asc', 'desc']);

const searchBar = ref(props.modelValue);

function searchInput(e) {
  emit('update:modelValue', e);
}

function descAsc(direction) {
  emit('update:sortBy', direction);
}

function orderData(orderByOption) {
  orderByOption.active = !orderByOption.active;
  if (orderByOption.active) {
    orderByOptions.value.push(orderByOption.key);
  } else {
    orderByOptions.value = orderByOptions.value.filter((option) => option !== orderByOption.key);
  }
  emit('update:orderBy', orderByOptions.value);
}

watch(
  () => props.orderBy,
  (value) => {
    orderByOptions.value = value;
  }
);
</script>
