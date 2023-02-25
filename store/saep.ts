export const useSaepStore = definePiniaStore('saep', {
  state: () => {
    return {
      saep: {} as Saep
    }
  },
  actions: {
    setSaep(saep: Saep) {
      this.saep = saep
    }
  }
})