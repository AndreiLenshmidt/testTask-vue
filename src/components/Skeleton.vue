<script setup>
import TableCeil from "./TableCeil.vue";
</script>
<template>
  <div v-for="_ in 12" class="flex justify-around items-center w-[585px]">
    <TableCeil
      className="basis-1/12 text-center truncate my-0.5 p-2 bg-sky-200 rounded-sm h-[40px] w-[100%]"
    />
    <TableCeil
      className="basis-1/7 text-center truncate my-0.5 p-2 bg-purple-200 rounded-sm h-[40px] w-[100%]"
    />
    <TableCeil
      className="basis-1/4 text-center truncate my-0.5 p-2 bg-sky-200 rounded-sm h-[40px] w-[100%]"
    />
    <TableCeil
      className="basis-1/4 text-center truncate my-0.5 p-2 bg-purple-200 rounded-sm h-[40px] w-[100%]"
    />
    <TableCeil
      className="basis-1/4 text-center truncate my-0.5 p-2 bg-sky-200 rounded-sm h-[40px] w-[100%]"
    />
  </div>
</template>
