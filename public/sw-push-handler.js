// Service Worker Notification Click & Background Push Handler for NPL App
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      // Focus existing open window if available
      for (const client of windowClients) {
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open a new window
      if (self.clients.openWindow) {
        return self.clients.openWindow(targetUrl);
      }
    })
  );
});

// Background Push listener (when subscribed to Web Push)
self.addEventListener('push', (event) => {
  let payload = {
    title: 'Nepal Premier League - Live Alert',
    body: 'Live match score update from TU Ground, Kirtipur!',
    tag: 'npl-match-event'
  };

  if (event.data) {
    try {
      payload = { ...payload, ...event.data.json() };
    } catch (e) {
      payload.body = event.data.text();
    }
  }

  const options = {
    body: payload.body,
    icon: '/pwa-192x192.png',
    badge: '/favicon.ico',
    tag: payload.tag || 'npl-live-event',
    renotify: true,
    data: {
      url: payload.url || '/'
    },
    vibrate: [200, 100, 200],
    actions: [
      { action: 'view', title: '🏏 View Scorecard' }
    ]
  };

  event.waitUntil(self.registration.showNotification(payload.title, options));
});
