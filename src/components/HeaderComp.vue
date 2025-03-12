<script setup>
import { useAppStore } from "@/stores/appStore.js";

const store = useAppStore();
</script>

<template>
  <div class="w-106 sm:w-150">
    <p class="pb-2">
      Bведите номера альбомов от 1 до 100 через пробел 1 4 7...
    </p>
    <div>
      <input
        type="text"
        class="bg-red-200 px-5 py-1"
        v-model="store.albums"
        placeholder="1 2 ..."
        title="введите номера альбомов 1-100 через пробел 1 2 ..."
      />
      <button
        class="ml-10 bg-violet-300 hover:bg-violet-500 active:opacity-70 px-5 py-1 rounded-lg outline-1 outline-blue-500"
        @click="store.handlerSearch"
      >
        ПОИСК
      </button>
    </div>
  </div>
</template>
