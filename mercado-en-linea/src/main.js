import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'

import Highcharts from 'highcharts/highstock'
import HighchartsVue from 'highcharts-vue'
import StockTools from 'highcharts/modules/stock-tools'
import Annotations from 'highcharts/modules/annotations'

import { createPinia } from 'pinia' // 👉 Importar Pinia

// Configuración global de Highcharts
Highcharts.setOptions({
  time: {
    useUTC: false
  },
  lang: {
    decimalPoint: ',',
    thousandsSep: '.',
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
             'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
                  'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    rangeSelectorFrom: 'Desde',
    rangeSelectorTo: 'Hasta',
    rangeSelectorZoom: ''
  }
})

const app = createApp(App)
const pinia = createPinia()         
app.use(pinia)                      
app.use(HighchartsVue)
app.mount('#app')
