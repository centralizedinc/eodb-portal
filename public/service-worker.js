/**
 * Workbox implem
 */

if (workbox) {
    console.log(`Workbox is loaded`);
    workbox.precaching.precacheAndRoute(self.__precacheManifest);
  } else {
    console.log(`Workbox didn't load`);
  }
  
  /**
   * Event Listeners
   */
  
  self.addEventListener("push", ev => {
    var data = ev.data.text();
    if (!data) {
      data = ev.data.json();  
    }
    console.log('PUSH DATA: ' + JSON.stringify(data))
    var payload = JSON.parse(data)
    self.registration.showNotification(payload.title, {
      body: payload.message,
      icon: "/smartjuan-logo.png",
      // actions: [{action: 'update', title: 'See Updates'}] 
    });
  });

  self.addEventListener("notificationclick", ev => {
    console.log('event :::', JSON.stringify(ev.notification.data))
    var url = "http://localhost:4000/#/"; 
    ev.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
  });
  
  self.addEventListener("message", e => {
    if (!e.data) {
      return;
    }
  
    switch (e.data) {
      case "skipWaiting":
        self.skipWaiting();
        break;
      default:
        // NOOP
        break;
    }
  });