const useHeaders = () => {
  const saep = useSaep()
  const headers: HeadersInit = {}

  headers.Saep =`${saep.id}`

  return headers
}

export default useHeaders;