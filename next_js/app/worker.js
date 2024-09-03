console.log('Worker prepared..');

self.addEventListener('push', (e) => {
    const data = e.data.json();
    console.log('Push Reveived');
    self.registration.showNotification(data.title, {
        body : "Notified testing broo!",
        icon : "https://png.pngtree.com/png-clipart/20220626/original/pngtree-pink-cute-cat-icon-animal-png-yuri-png-image_8188672.png"
    })
})