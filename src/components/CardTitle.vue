<template>
  <div>cardtitle</div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({ isEdited: Boolean });
console.log('CardText Props', props);
</script>

