<script setup>
defineProps(["text", "className"]);
</script>
<template>
  <p :class="className" :title="text">
    {{ text }}
  </p>
</template>
