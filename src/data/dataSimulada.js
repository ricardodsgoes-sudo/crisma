// Para simular uma data diferente, troque a linha abaixo.
// Coloque null para usar a data real de hoje.
const DATA_SIMULADA = null

export function getHoje() {
  const d = DATA_SIMULADA ? new Date(DATA_SIMULADA + 'T00:00:00') : new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

export const SIMULANDO = !!DATA_SIMULADA
