<script setup lang="ts">
import ChartComponent from '@/components/ChartComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import SearchBarComponent from '@/components/SearchBarComponent.vue';
import InstrumentListComponent from '@/components/InstrumentListComponent.vue'; 
import InstrumentItemComponent from '@/components/InstrumentItemComponent.vue';
import SummaryComponent from '@/components/SummaryComponent.vue';
import TabComponent from '@/components/TabComponent.vue';

import  {fetchHistoryData, fetchResumenData} from '@/services/getData_service'
import { watch , ref} from 'vue'
import { useFilterStore } from '@/stores/useFilterStore'

const filterStore = useFilterStore()


var chartData = ref([])

watch(
    () => filterStore.companyName,
  async (newValue, oldValue) => {
    console.log('Empresa cambiada:', oldValue, '→', newValue)
    
    // Llamar al servicio cuando cambia la empresa
    try {
      const historyData = await fetchHistoryData(newValue)
      console.log('Datos del historial:', historyData.data.chart)
      chartData.value = historyData.data.chart
      console.log("var", chartData.value)
    } catch (error) {
      console.error('Error al obtener historial:', error)
    }
  },
  
)

</script>
<template>
  <main class="w-full h-auto min-w-3xl bg-background-color flex flex-col gap-5 pr-80 pl-20 py-3 pt-15 border">
    <SearchBarComponent />

    <div class="flex flex-row gap-5 max-lg:flex-col md:p-0 lg:h-auto ">
      <div class="flex flex-col gap-10 w-full">
        <HeaderComponent :companyName="filterStore.companyName" />
        
        <ChartComponent :companyName="filterStore.companyName" />

      </div>

      <SummaryComponent class="w-full md:w-auto md:max-w-xs flex flex-1/2" :companyName="filterStore.companyName" />
    </div>

    <div class="w-full">
      <TabComponent />
      <div class="w-full">
        <InstrumentListComponent />
      </div>
    </div>
  </main>
</template>