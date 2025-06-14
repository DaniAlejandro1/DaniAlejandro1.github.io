<script setup lang="ts">
import SearchIcon from '@/assets/icons/magnifying-glass-solid.svg';
</script>

<template>
  <div class="flex items-center h-[45px] bg-default-grey border-1 border-border-grey rounded-md px-3">
    <picture class="pr-2">
      
      <img :src="SearchIcon" alt="" width="24" >
    </picture>
    <input
      id="main-search"
      type="search"
      placeholder="Busca un instrumento"
      class="ml-2 w-full bg-transparent focus:outline-none text-xl text-white placeholder-gray-600 font-normal placeholder:text-base"
      v-on:click=""
    />
  </div>
</template>
