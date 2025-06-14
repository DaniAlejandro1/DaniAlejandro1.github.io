const filesHistory = {
  'AGUAS-A': 'data/history/history-AGUAS-A.json',
  'ANDINA-B': 'data/history/history-ANDINA-B.json',
  'BCI': 'data/history/history-BCI.json',
  'BSANTANDER': 'data/history/history-BSANTANDER.json',
  'CAP': 'data/history/history-CAP.json',
  'IPSA': 'data/history/history-IPSA.json'
}

const filesResumen = {
  'AGUAS-A': 'data/resumen/AGUAS-A.json',
  'ANDINA-B': 'data/resumen/ANDINA-B.json',
  'BCI': 'data/resumen/BCI.json',
  'BSANTANDER': 'data/resumen/BSANTANDER.json',
  'CAP': 'data/resumen/CAP.json',
  'IPSA': 'data/resumen/IPSA.json'
}


export async function fetchIpsaData() {
  const response = await fetch('/data/constituyentes/constituensList.json')
  const data = await response.json()
  return data.data.constituents
}

export async function fetchHistoryData(company) {
  const path = filesHistory[company]
  if (!path) throw new Error(`Historial no encontrado para: ${company}`)
  const response = await fetch(path)
  return await response.json()
}

export async function fetchResumenData(company) {
  const path = filesResumen[company]
  if (!path) throw new Error(`Resumen no encontrado para: ${company}`)
  const response = await fetch(path)
  return await response.json()
}
