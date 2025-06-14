<script setup>
import { fetchIpsaData } from '@/services/getData_service'
import { ref, onMounted, computed } from 'vue'
import InstrumentItemComponent from './InstrumentItemComponent.vue'

import { useFilterStore } from '@/stores/useFilterStore'

const filterStore = useFilterStore()

const originalData = ref([])
const sortedData = ref([])
const sortKey = ref(null)
const sortDirection = ref('asc') 

function chunkArray(array, size) {
  const chunks = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

const tableChunks = computed(() => chunkArray(sortedData.value, 16))

function sortBy(key) {
  if (sortKey.value === key) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDirection.value = 'asc'
  }

  sortedData.value = [...originalData.value].sort((a, b) => {
    const valA = a[key]
    const valB = b[key]

    if (typeof valA === 'string') {
      return sortDirection.value === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    }

    return sortDirection.value === 'asc' ? valA - valB : valB - valA
  })
}

onMounted(async () => {
  const data = await fetchIpsaData()
  originalData.value = data
  sortBy('codeInstrument') 
})
</script>

<template>
  <main class="">
    <div class="flex gap-4 w-full justify-between overflow-auto">
      <div
        v-for="(chunk, index) in tableChunks"
        :key="index"
        class="min-w-max border"
      >
        <table class="table-auto text-xs text-white w-full">
          <thead class="border-b-1">
            <tr>
              <th class="px-2 w-60 h-10 py-1 text-left">
                <button @click="sortBy('codeInstrument')" class="hover:underline">Nombre</button>
              </th>
              <th class="px-2 py-1">
                <button @click="sortBy('lastPrice')" class="hover:underline">Precio</button>
              </th>
              <th class="px-2 py-1">
                <button @click="sortBy('pctDay')" class="hover:underline">Var día</button>
              </th>
              <th class="px-2 py-1">
                <button @click="sortBy('pct30D')" class="hover:underline">Var 30d</button>
              </th>
              <th class="px-2  py-1">
                <button @click="sortBy('pctCY')" class="hover:underline">Año Actual</button>
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="item in chunk" :key="item.codeInstrument">
              <td @click="filterStore.setFilter(item.codeInstrument)" class="px-2 py-1 text-left hover:bg-gray-800 cursor-pointer">
                {{ item.codeInstrument }}
              </td>
              <InstrumentItemComponent class="text-right" :value="item.lastPrice"  :currency="true" />
              <InstrumentItemComponent class="text-right" :value="item.pctDay" :isPercentage="true" />
              <InstrumentItemComponent class="text-right" :value="item.pct30D" :isPercentage="true" />
              <InstrumentItemComponent class="text-right" :value="item.pctCY" :isPercentage="true" />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>
