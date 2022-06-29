<template>
  <div class="flex justify-between">
    <h1 class="text-black text-[32px] font-bold">To do list</h1>
    <button @click="addCard()" class="rounded-full bg-green-50 text-white w-10 h-10 font-thin text-2xl">+</button>
  </div>
  <div class="relative gap-y-12 flex flex-col overflow-hidden">
    <SearchBar v-model="searchString" v-model:orderBy="orderByOptions" v-model:sortBy="sortDirection" />
    <TransitionGroup name="delete-card">
      <GeneralCard
        v-for="(card, index) in filteredCards"
        :key="card.id"
        :modelValue="card"
        @update:modelValue="updateCard"
        @deleteCard="deleteCard(card.id)"
        @checked="moveElementToLastPosition(index)"
      />
    </TransitionGroup>
    <Transition name="empty-img">
      <img v-if="!cards.length" src="../assets/arrayempty.png" />
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import GeneralCard from './GeneralCard.vue';
import SearchBar from './SearchBar.vue';

const cards = ref(localStorage.getItem('cards') ? JSON.parse(localStorage.getItem('cards')) || [] : []);
function addCard() {
  cards.value.unshift({
    title: '',
    text: '',
    priorityText: 'Medium',
    isChecked: false,
    id: Math.random(),
  });
}

const orderByOptions = ref(['']);

const sortDirection = ref('');

function updateCard(card) {
  const index = cards.value.findIndex((c) => c.id === card.id);
  cards.value[index] = card;
}

function deleteCard(index) {
  cards.value = cards.value?.filter((card) => card.id !== index);
  filteredCards.value = filteredCards.value.filter((card) => card.id !== index);
}

function moveElementToLastPosition(index) {
  const card = cards.value[index];
  setTimeout(() => {
    cards.value.splice(index, 1);
    cards.value.push(card);
  }, 700);
}

const searchString = ref('');
// function fieldSorter(fields) {
//   var dir = [],
//     i,
//     l = fields.length;
//   fields = fields.map(function (o, i) {
//     if (o[0] === '-') {
//       dir[i] = -1;
//       o = o.substring(1);
//     } else {
//       dir[i] = 1;
//     }
//     return o;
//   });

//   return function (a, b) {
//     for (i = 0; i < l; i++) {
//       var o = fields[i];
//       console.log(a[o]);
//       console.log(b[o]);
//       if (a[o] > b[o]) return dir[i];
//       if (a[o] < b[o]) return -dir[i];
//     }
//     return 0;
//   };
// }
const fieldSorter = (fields) => (firstCard, secondCard) =>
  fields
    .map((key) => {
      let dir = 1;
      if (key[0] === '-') {
        dir = -1;
        key = key.substring(1);
        console.log(key);
      }
      return firstCard[key] > secondCard[key] ? dir : firstCard[key] < secondCard[key] ? -dir : 0;
    })
    .reduce((p, n) => (p ? p : n), 0);

const filteredCards = computed(() => {
  const sortingOptions = orderByOptions.value
    .map((key) => {
      if (sortDirection.value === 'asc') {
        return `${key}`;
      } else if (sortDirection.value === 'desc') {
        return `-${key}`;
      } else {
        return null;
      }
    })
    .filter((item) => item !== null);
  return (
    cards.value
      ?.filter?.(
        (card) =>
          card.title.toLowerCase().includes(searchString.value.toLowerCase()) ||
          card.text.toLowerCase().includes(searchString.value.toLowerCase())
      )
      ?.sort?.(fieldSorter(sortingOptions)) || []
  );
});

watch(
  cards,
  () => {
    console.warn('updated', cards.value);
    localStorage.setItem('cards', JSON.stringify(cards.value));
  },
  { deep: true }
);
</script>
<style>
.delete-card-enter-active {
  transition: all 0.3s ease-out;
}

.delete-card-leave-active {
  position: absolute;
  width: 100%;
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.delete-card-enter-from,
.delete-card-leave-to {
  transform: translateX(100px);
  opacity: 0;
}
.delete-card-move {
  transition: all 0.3s ease;
}

.empty-img-enter-from .empty-img-leave-to {
  opacity: 0;
}
.empty-img-enter-active,
.empty-img-leave-active {
  transition: all 0.3s ease-out;
}
.empty-img-enter-to .empty-img-leave-from {
  opacity: 1;
}
</style>
