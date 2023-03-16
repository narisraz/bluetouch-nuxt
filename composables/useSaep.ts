export const useSaep = (saep?: Saep) => {
  const cookie = useCookie<Saep>('saep')
  if (saep) {
    cookie.value = saep
  }
  return cookie.value
}