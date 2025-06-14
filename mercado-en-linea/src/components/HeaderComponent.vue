<script setup>
import { onMounted, ref, watch } from 'vue'
import { fetchResumenData } from '@/services/getData_service'


const props = defineProps({
  companyName: {
    type: String,
    required: true
  }
})

const companyName = ref(props.companyName)
const lastValue = ref(0)
const varActual = ref(0)
const varPointActual = ref(0)
const tend = ref('')

const loadData = async (name) => {
  try {
    const response = await fetchResumenData(name)
    console.log(response)
    const price = response.data.price
    
    tend.value = price.tend
    console.log(tend.value)
    companyName.value = response.data.info.codeInstrument
    lastValue.value = response.data.price.lastPrice
     if (price.closePrice && price.lastPrice) {
      varPointActual.value = price.lastPrice - price.closePrice
      varActual.value = (varPointActual.value / price.closePrice) * 100
    }

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
</script>


<template>
  <div class="h-[15vh] w-full min-w-[568px]">
    <header>
      <h1 class="text-white text-2xl pb-6">{{ companyName }}</h1>
    </header>

    <section>
      <p class="text-gray-600">Índice</p>

      <article class="border-t-1 border-b-1 text-gray-600 flex gap-6 py-1 w-full">
        <div class="flex gap-4">
          <span class="block font-semibold">Valor Actual</span>
          <div v-if="tend === 'down'" class="flex gap-1">
              <svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 384 512" fill="white" width="10" height="24"><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z"/></svg>
            <span class="text-white">{{ lastValue }}</span>
          </div> 
          <div v-if="tend === 'up'" class="flex gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"  fill="white" width="10" height="24"><path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z"/></svg>

            <span class="text-white">{{ lastValue }}</span>
          </div> 
           <div v-if="tend === 'same'" class="flex gap-1">
            
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" width="10" height="24"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"/></svg>            <span class="text-white">{{ lastValue }}</span>
          </div> 
        </div>
        <div class="flex gap-4">
          <span class="block font-semibold">Var.% Actual</span>
          <span :class="
          varActual < 0 ? 'text-red-500': 'text-green-500'
          "> {{ varActual.toFixed(2) }}</span>
        </div>
        <div class="flex gap-4">
          <span class="block font-semibold">Var. Puntos Actual</span>
          <span
          :class="
          varPointActual < 0 ? 'text-red-500': 'text-green-500'
          "
          >{{varPointActual.toFixed(2) }}</span>
        </div>
      </article>
    </section>
  </div>
</template>
