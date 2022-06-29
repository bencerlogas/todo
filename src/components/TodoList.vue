<template>
  <div class="flex justify-between">
    <h1 class="text-black text-2xl font-bold">To do list</h1>
    <button @click="addCard()" class="rounded-full bg-green-50 text-white w-10 h-10 font-thin text-2xl">+</button>
  </div>
  <div class="relative gap-y-12 flex flex-col overflow-hidden">
    <TransitionGroup name="delete-card" appear>
      <GeneralCard
        v-for="(card, index) in cards"
        :key="card"
        :card="card"
        :index="index"
        @deleteCard="deleteCard"
        @sendPriorityvalues="pushPriority"
      />
    </TransitionGroup>
    <Transition name="empty-img">
      <img v-if="!cards.length" src="../assets/arrayempty.png" />
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import GeneralCard from './GeneralCard.vue';

const cards = ref([]);
function addCard() {
  cards.value.unshift({
    title: '',
    text: '',
    priority: '',
    isChecked: true,
  });
}
function deleteCard(index) {
  cards.value.splice(index, 1);
}
function pushPriority(priority, index) {
  cards.value[index].priority = priority;
}
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

.empty-img-leave-active {
  transition: all 0.3s ease-out;
}
</style>
