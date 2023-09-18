const staticName = 'staticStuff'
const assets = [
    '/index.html',
    '/dist/homepage.html',
    '/dist/homePage.bundle.js',
    '/src/app.js',
    '/src/enterPin.js',
    '/src/payment.js',
    '/src/successPage.js',
    '/src/time.js',
    '/assets/img/send.png',
    '/assets/img/transfer.png',
    "/assets/img/sync.png",
    "/assets/img/backArrow.png",
    "/assets/img/photoCamera.png",
    '/assets/img/paper-plane1.ico',
    '/dist/style.css',
    "/assets/img/menu.png",
    // "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
    // '/assets/img/paper-plane2.ico',
    // "/assets/img/visibility_off.png",
    // "/assets/img/visibility.png",
    // "/assets/img/receive.png",
    // '/dist/enter-pin-page.html',
    // "/dist/html5-qrcode.min.js",
    // "/dist/camera-receiver.html",
    // "/dist/receiverInfo.bundle.js",
    // "/dist/receiverCamera.bundle.js",
    // "/dist/senderCamera.bundle.js",
    // "/dist/senderQRcode.bundle.js",
    // "/dist/sellerGenerate.bundle.js",
    // "/dist/senderConfirmation.bundle.js",
    // "/dist/success-page.html",
    // "/dist/scan-camera.html",
    // "/dist/camera.html",
    // "/dist/senders-confirmation.html",
    // "/dist/request-payment.html"
]

self.addEventListener('install', (evt)=>{
    evt.waitUntil(
        caches.open(staticName).then(cache=>{
            console.log('cached')
            cache.addAll(assets)
        })
    )
   
})

self.addEventListener('activate', (evt)=>{
    evt.waitUntil( 
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticName )
                .map(key => caches.delete(key)))
        })
    
    )
})

self.addEventListener('fetch', (evt)=>{
    evt.respondWith(
        caches.match(evt.request).then(cacheRes=>{
            return cacheRes || fetch(evt.request)
        })
    )
})
