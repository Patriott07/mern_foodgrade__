console.log('Worker prepared..');

self.addEventListener('push', (e) => {
    const data = e.data.json();
    console.log('Push Reveived');
    console.log({ data })
    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
        requireInteraction : true,
        sound : "https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a",
        vibrate : [200, 300, 100],
        timestamp : Date.now(),
        image : "https://images.unsplash.com/photo-1498092590708-048e0e2f46d7?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        actions: [
            {
                action: data.data.recipeId,
                title: "See Recipe",
                // icon : 'https://img.icons8.com/ios/452/food.png',
                link: `https://localhost:3000/recipes/${data.data.recipeId}`
            },
            {
                action: "cancel",
                title: "Not now",
                // icon : 'https://img.icons8.com/ios/452/food.png',
                link: `https://localhost:3000/recipes/${data.data.recipeId}`
            },
        ]
    })
})

self.addEventListener('notificationclick', async (e) => {
    const action = e.action;
    const notification = e.notification;

    console.log('notification clciked with event ', action, notification, { e });

    if (action == "cancel") {
        // await clients.openWindow('https://localhost:3000/recipes'); // Gantilah dengan URL yang tepat
        await notification.close();
    }else{
        await clients.openWindow(`https://localhost:3000/recipes/${action}`); // Gantilah dengan URL yang tepat
        await notification.close();
    }
})