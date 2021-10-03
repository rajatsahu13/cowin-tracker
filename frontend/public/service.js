const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const saveSubscription = async subscription => {
  const SERVER_URL = '/save-subscription'
  const response = await fetch(SERVER_URL, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  })
  return response.json()
}

self.addEventListener('activate', async () => {
  const applicationServerKey = urlB64ToUint8Array(
    'BF_OuAQ0A-_ap93NGudbMn84ZoGJHmEn1VfLn0J9MI7apPBz4cMFo1bCXfrWDdTcL278vBxBbZjc8GfJHqWgzqU'
  )
  const options = { applicationServerKey, userVisibleOnly: true }
  const subscription = await self.registration.pushManager.subscribe(options)
  await saveSubscription(subscription)
})

self.addEventListener('push', function(event) {
  if (event.data) {
    showLocalNotification('Slot Available!', event.data.text(), self.registration)
  }
})

const showLocalNotification = (title, body, swRegistration) => {
  const options = { body }
  swRegistration.showNotification(title, options)
}