<script setup>
import { ref, watch, onMounted } from 'vue'
import Highcharts from 'highcharts/highstock'
import { fetchHistoryData } from '@/services/getData_service'

const props = defineProps({
  companyName: {
    type: String,
    required: true
  }
})

const chartContainer = ref(null)
const chartInstance = ref(null)
const dateSelected = ref("1M")
const rawData = ref([])

const formatData = (raw) => {
  if (!Array.isArray(raw)) return []
  return raw.map((item) => {
  const [day, month, yearAndTime] = item.datetimeLastPrice.split('-')
  const [year, time] = yearAndTime.split(' ')
  const isoString = `${year}-${month}-${day}T${time}` // formato ISO válido
  return [new Date(isoString).getTime(), item.lastPrice]
})
}

const buttons = [
  { label: '1M', unit: 'month', count: 1 },
  { label: '3M', unit: 'month', count: 3 },
  { label: '6M', unit: 'month', count: 6 },
  { label: '1A', unit: 'year', count: 1 }
]

const initChart = (data) => {
  chartInstance.value = Highcharts.stockChart(chartContainer.value, {
    chart: {
      height: 185,
      backgroundColor: "#0f0f0f",
      zoomType: '',
      events: { selection: () => false }
    },
    credits: { enabled: false },
    rangeSelector: { enabled: false },
    navigator: { enabled: false },
    scrollbar: { enabled: false },
    tooltip: {
      shared: true,
      formatter() {
        const date = Highcharts.dateFormat('%e %b %Y', this.x)
        const value = this.points?.[0]?.y ?? this.y
        return `<b>${date}</b><br/>Valor del día: <b>${value}</b>`
      }
    },
    xAxis: { type: 'datetime' },
    yAxis: {
      opposite: false,
      gridLineColor: "#2e2e2e"
    },
    series: [{
      name: 'Valor',
      type: 'area',
      data,
      color: "#2baeff",
      fillColor: {
        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
        stops: [[0, '#24508e'], [1, '#17273b']]
      }
    }]
  })

  setRange('month', 1)
}

const setRange = (unit, count) => {
  const end = new Date("2024-11-06 14:30:52")
  const start = new Date(end) // crear una copia exacta

  if (unit === 'month') start.setMonth(start.getMonth() - count)
  if (unit === 'year') start.setFullYear(start.getFullYear() - count)

  chartInstance.value?.xAxis[0].setExtremes(start.getTime(), end.getTime())
}

const loadData = async () => {
  try {
    const response = await fetchHistoryData(props.companyName)
    rawData.value = response.data.chart
    const formatted = formatData(rawData.value)
    if (chartInstance.value) {
      chartInstance.value.series[0].setData(formatted)
    } else {
      initChart(formatted)
    }
  } catch (err) {
    console.error("Error fetching data:", err)
  }
}

onMounted(loadData)

watch(() => props.companyName, () => {
  loadData()
})


</script>

<template>
  <div class='flex flex-col-reverse gap-4'>

    <div id="chart-footer" class='flex'>
      <button v-for="(btn, idx) in buttons" :key="idx" @click="() => {
        dateSelected = btn.label
        setRange(btn.unit, btn.count)
      }" :class="[
          'px-[16px] h-[28px] py-[4px] transition  border-1 border-solid  flex items-center border-[#ffffff1a] hover:cursor-pointer ',
          btn.label === dateSelected ? 'bg-[#3372ca] text-[#1f0000] hover:brightness-105' : 'text-white bg-[#202124] hover:brightness-125 ',

            idx === 0 ? 'rounded-l' : '',
            idx === buttons.length - 1 ? 'rounded-r' : ''
        ]">

        {{ btn.label }}
      </button>
    </div>

    <div id="chart-container" ref="chartContainer" class="min-h-[185px] w-full"></div>
  </div>
</template>