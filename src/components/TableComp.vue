<script setup>
import { useAppStore } from "@/stores/appStore.js";
import { useIntersectionObserver } from "@vueuse/core";
import { useTemplateRef } from "vue";
import TableCeil from "@/components/TableCeil.vue";
import Skeleton from "./Skeleton.vue";

const store = useAppStore();

const root = useTemplateRef("root");
const target = useTemplateRef("target");

useIntersectionObserver(
  target,
  ([entry]) => {
    if (entry.isIntersecting && store.shownPictures >= store.picturesLength) {
      store.loadPictures();
    }
    if (entry.isIntersecting && store.shownPictures <= store.picturesLength) {
      store.shownPictures = store.shownPictures + 20;
    }
  },
  { root }
);
</script>

<template>
  <div class="w-106 sm:w-150 bg-neutral-100 m-auto" ref="root">
    <div class="flex justify-around items-center bg-red-200">
      <TableCeil
        v-for="item in store.tableHead"
        :key="item + 'thead'"
        :text="item.text"
        :className="item.className"
        @click="store.filterHandler(item.text)"
      />
    </div>
    <div class="overflow-hidden overflow-y-scroll max-h-[556px]">
      <TransitionGroup name="list" tag="ul">
        <li
          v-for="item in store.loadedPictures"
          :key="item.id + item.url"
          class="flex justify-around items-center"
        >
          <TableCeil
            :text="item.id"
            className="basis-1/12 text-center truncate my-0.5 p-2 bg-sky-200 rounded-sm"
          />
          <TableCeil
            :text="item.albumId"
            className="basis-1/7 text-center truncate my-0.5 p-2 bg-purple-200 rounded-sm"
          />
          <TableCeil
            :text="item.title"
            className="basis-1/4 text-center truncate my-0.5 p-2 bg-sky-200 rounded-sm"
          />
          <TableCeil
            :text="item.url"
            className="basis-1/4 text-center truncate my-0.5 p-2 bg-purple-200 rounded-sm"
          />
          <TableCeil
            :text="item.thumbnailUrl"
            className="basis-1/4 text-center truncate my-0.5 p-2 bg-sky-200 rounded-sm"
          />
        </li>
      </TransitionGroup>
      <div ref="target"></div>
      <Skeleton />
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-70px);
}
</style>
