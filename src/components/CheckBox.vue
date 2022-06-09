<template>
  <div class="transition-all delay-200">
    <div
      v-if="!isEdited"
      @click.prevent.stop="checkBtn()"
      class="relative rounded-full border-[6px] h-10 w-10 transition-all"
      :class="isBtnChecked ? 'border-[#4FDA9B]' : 'border-black'"
    >
      <div v-if="isBtnChecked" class="absolute -right-6 -top-7">
        <svg class="animated-check" viewBox="0 0 24 24">
          <path d="M4.1 12.7L9 17.6 20.4 4.1" fill="none" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({ isEdited: Boolean });

const isBtnChecked = ref(false);

function checkBtn() {
  isBtnChecked.value = !isBtnChecked.value;
}
</script>
<style>
.animated-check {
  height: 4em;
  width: 4em;
}

.animated-check path {
  fill: none;
  stroke: #4fda9b;
  stroke-width: 3;
  stroke-dasharray: 23;
  stroke-dashoffset: 23;
  animation: draw 0.25s linear forwards;
  stroke-linecap: round;
  stroke-linejoin: round;
}

@keyframes draw {
  to {
    stroke-dashoffset: 2;
  }
}
</style>
