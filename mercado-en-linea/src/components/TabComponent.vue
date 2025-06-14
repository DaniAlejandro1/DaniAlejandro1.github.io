<script setup>
  import { ref } from 'vue';

  const tabs = [
    { id: '1', label: 'IPSA' },
    { id: '2', label: 'IGPA' },
    { id: '3', label: 'NASDAQ' },
    { id: '4', label: 'DOWN JONES' },
    { id: '5', label: 'SP/BVL' },
  ];

  const activeTab = ref('1');
</script>
<template>
  <div class="flex border-b-2 border-b-neutral-500">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="{
        'px-4 py-4 font-medium hover:cursor-pointer': true,
        'border-b-2 border-b-[#87b9ff] text-white': activeTab === tab.id,
        'hover:text-gray-700 text-neutral-400': activeTab !== tab.id
      }"
      @click="activeTab = tab.id"
    >
      {{ tab.label }}
    </button>
  </div>
</template>
