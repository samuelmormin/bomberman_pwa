// etre sur que le navigateur supporte les services workers
if ('serviceWorker' in navigator) {
    // inscription du service workler
    window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('../sw.js')
    .then (reg => console.log("Service worker : Register"))
    .catch(err=> console.log("Service worker: Error ${err}"))
    })
    }