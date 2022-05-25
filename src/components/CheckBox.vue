<template>
  <div>checkbox</div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({ isEdited: Boolean });
console.log(props);
</script>

