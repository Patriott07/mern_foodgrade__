const publicKey = "BKEvdlOVCRgdPJEEbpvivAo6sPI27foTSsb1YS-bvJMezvPhw4VCmWKWO1B5rMJFSbB-a23Tug6_fnnS7Gvsk28";

// Check service 
if('serviceWorker' in navigator) {
    send().catch(err => console.log(err));
}

async function send() {
    console.log('Registering service worker..')
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope : '/'
    });
    console.log('Registering service worker done..')


    console.log('Registering push..')
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly : true,
        applicationServerKey : urlBase64ToUint8Array(publicKey)
    });
    
    console.log('Registering push done..', {subscription});
    
    console.log('Sending push..');
    await fetch('http://localhost:5072/subscribe', {
        method : 'POST',
        body : JSON.stringify(subscription),
        headers : {
            'Content-Type' : "application/json"
        }
    });
    
    console.log('Sending push done.. ');

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}