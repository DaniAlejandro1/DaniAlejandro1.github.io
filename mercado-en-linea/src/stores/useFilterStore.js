import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useFilterStore = defineStore('filter', () =>{
    const companyName = ref("IPSA")

    function setFilter(name) {
        companyName.value = name
    }

    return {companyName,setFilter}
})