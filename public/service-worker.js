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
      icon: "/smartjuan-logo.png"
    });
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