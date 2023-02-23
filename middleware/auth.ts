export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useStrapiUser()
  if (!user.value) {
    useCookie('redirect', { path: '/home' }).value = to.fullPath
    return navigateTo('/login')
  }
})