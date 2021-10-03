function notificationHandler() {
  const registerServiceWorker = async () => {
    const swRegistration = await navigator.serviceWorker.register('service.js')
    return swRegistration
  }
      
  const requestNotificationPermission = async () => {
    await window.Notification.requestPermission()
  }
      
  const main = async () => {
    await requestNotificationPermission()
    await registerServiceWorker()
  }
  
  main()
}

export default notificationHandler