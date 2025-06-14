<script setup>
import { fetchResumenData } from '@/services/getData_service';
import { onMounted, ref, watch } from 'vue'

  const props = defineProps({
    companyName: {
      type: String,
      required: true
    }
  })
  const tabs = [
    { id: '1', label: 'Resumen' },
    { id: '2', label: 'Detalles' },
  ];

  const companyName = ref(props.companyName)

  const marketName = ref('')
  const datetimeLastPrice = ref('')
  const openPrice = ref('')
  const closePrice = ref('')
  const maxDay = ref('')
  const minDay = ref('')
  const max52W = ref('')
  const min52W = ref('')
  const pct30D = ref(0)
  const pctRelW52 = ref(0)
  const pctRelCY = ref(0)


  const loadData = async (name) => {
  try {
    const response = await fetchResumenData(name)
    console.log(response)
    const price = response.data.price
    const data = response.data.info
    marketName.value = data.marketName
    datetimeLastPrice.value = price.datetimeLastPrice
    openPrice.value = price.openPrice
    closePrice.value = price.closePrice
    maxDay.value = price.maxDay
    minDay.value = price.minDay
    max52W.value = price.max52W
    min52W.value = price.min52W
    pct30D.value = price.pct30D
    pctRelW52.value = price.pctRelW52
    pctRelCY.value = price.pctRelCY


  } catch (err) {
    console.error("Error fetching data:", err)
  }
}

  onMounted(() => {
      loadData(props.companyName)
  })


watch(
  () => props.companyName,
  (newVal) => {
    if (newVal) loadData(newVal)
  }
)
  const activeTab = ref('1');
</script>
<template>
  <div class="flex flex-col pt-6">

    <div class="flex border-b-2 justify-between border-b-neutral-500">
      <button
      v-for="tab in tabs"
      :key="tab.id"
      :class="{
        'px-4 py-4 font-medium hover:cursor-pointer w-full': true,
        'border-b-2 border-b-[#87b9ff] text-white': activeTab === tab.id,
        'text-neutral-400': activeTab !== tab.id
      }"
      @click="activeTab = tab.id"
      >
      {{ tab.label }}
    </button>
  </div>
  <div class="p-4">
    <div class="w-full">
 <table class="table-fixed text-white text-xs border-collapse w-full">
  <thead class="border-b border-gray-700">
    <tr>
      <th class="py-2 text-left">Cotización</th>
      <th class="py-2 text-right">13/06/2025 - 4:02:03 p. m.</th>
    </tr>
  </thead>
  <tbody class=" bg-[#0f0f0f]">
    <tr>
      <td class="py-px pt-1.5 font-medium">Mercado</td>
      <td class="py-px pt-1.5 text-nowrap text-right">{{ marketName }}</td>
    </tr>
    <tr>
      <td class="py-px font-medium text-nowrap">Apertura</td>
      <td class="py-px text-right">{{ openPrice }}</td>
    </tr>
    <tr>
      <td class="py-px font-medium text-nowrap">Cierre anterior</td>
      <td class="py-px text-right">{{closePrice }}</td>
    </tr>
    <tr>
      <td class="py-px font-medium text-nowrap">Máximo diario</td>
      <td class="py-px text-right">{{  maxDay}}</td>
    </tr>
    <tr>
      <td class="py-px font-medium text-nowrap">Mínimo diario</td>
      <td class="py-px text-right">{{ minDay }}</td>
    </tr>
    <tr>
      <td class="py-px font-medium text-nowrap">Máximo 52 semanas</td>
      <td class="py-px text-right">{{ max52W }}</td>
    </tr>
    <tr>
      <th class="py-px font-medium text-nowrap text-left">Mínimo 52 semanas</th>
      <th class="py-px text-right">{{ min52W }}</th>
    </tr>
  </tbody>
  <thead class="border-b border-gray-700">
    <tr>
      <th class="py-2 text-left">Variación</th>
      <th class="py-2 text-right">%</th>
    </tr>
  </thead>
  <tbody class="bg-[#0f0f0f]">
    <tr>
      <td class="py-px font-medium text-nowrap">1 MES</td>
      <td class="py-px text-right"
      :class="
          pct30D < 0 ? 'text-red-500': 'text-green-500'
          "
      >{{ pct30D.toFixed(2) }}</td>
    </tr>
    <tr>
      <td class="py-px font-medium text-nowrap">1 AÑO</td>
      <td class="py-px text-right"
      :class="
          pctRelW52 < 0 ? 'text-red-500': 'text-green-500'
          "
      >{{ pctRelW52.toFixed(2) }}</td>
    </tr>
    <tr>
      <td class="py-px font-medium text-nowrap">AÑO A LA FECHA</td>
      <td class="py-px text-right"
      :class="
          pctRelCY < 0 ? 'text-red-500': 'text-green-500'
          "
      >{{pctRelCY.toFixed(2)}}</td>
    </tr>
  </tbody>
</table>



    </div>
        
  </div>
</div>
</template>