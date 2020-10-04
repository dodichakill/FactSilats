const CACHE_NAME = 'firstpwa-v4';
var urlsToCache = [
	'/',
	'https://fonts.googleapis.com/icon?family=Material+Icons',
	'https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2',
	'https://fonts.googleapis.com/css2?family=Lato&family=Montserrat&display=swap',
	'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
	'https://fonts.gstatic.com/s/lato/v17/S6uyw4BMUTPHjx4wXg.woff2',
	'/favicon-16x16.png',
	'/favicon-32x32.png',
	'/site.webmanifest',
	'/android-chrome-192x192.png',
	'/nav.html',
	'/index.html',
	'/pages/home.html',
	'/pages/TapakSuci.html',
	'/pages/PagarNusa.html',
	'/pages/MerpatiPutih.html',
	'/css/materialize.min.css',
	'/css/style.css',
	'/js/materialize.min.js',
	'/img/as.jpeg',
	'/img/asad.jpg',
	'/img/mp.jpg',
	'/img/perisaidiri.jpg',
	'/img/perisaiputih.jpg',
	'/img/pn.jpg',
	'/img/psht.jpg',
	'/img/pstd.jpg',
	'/img/smi.jpg',
	'/img/ts.jpg',
    '/js/script.js'
    
];

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
})

self.addEventListener('activate', function(event){
	event.waitUntil(
		caches.keys()
		.then(function(cacheNames) {
			return Promise.all(
				cacheNames.map(function(cacheName){
					if(cacheName != CACHE_NAME){	
						console.log("ServiceWorker: cache " + cacheName + " telah dihapus");
						return caches.delete(cacheName);
					}
				})
			);
		})
	);
})

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request, {cacheName:CACHE_NAME})
		.then(function(response) {
			if(response){
				console.log("ServiceWorker: Menggunakan aset dari cache: ", response.url);
				return response;
			}
			
			console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
			return fetch(event.request);
		})
	);
});

