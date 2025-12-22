/* eslint-disable no-restricted-globals */
/* Auto Refresh Token Service Worker - Handles token refresh in background */

const CACHE_NAME = 'belle-portal-v1';

// Install event - cache resources
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Activate immediately
});

// Activate event - cleanup old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
  return self.clients.claim(); // Take control of all pages
});

// Message event - receive messages from main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'REFRESH_TOKEN') {
    handleTokenRefresh();
  } else if (event.data && event.data.type === 'SCHEDULE_TOKEN_CHECK') {
    // Schedule token check based on expiration time
    const { expirationTime, refreshBeforeSeconds } = event.data;
    scheduleTokenCheck(expirationTime, refreshBeforeSeconds);
  } else if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Scheduled check timeout reference
let scheduledCheckTimeout = null;

/**
 * Schedule token check based on expiration time
 * This will check the token before it expires (based on refreshBeforeSeconds)
 */
function scheduleTokenCheck(expirationTime, refreshBeforeSeconds = 300) {
  // Clear existing scheduled check
  if (scheduledCheckTimeout) {
    clearTimeout(scheduledCheckTimeout);
    scheduledCheckTimeout = null;
  }

  const currentTime = Date.now() / 1000; // Convert to seconds
  const timeUntilExpiration = expirationTime - currentTime;
  const refreshTime = timeUntilExpiration - refreshBeforeSeconds; // Refresh before expiration

  // If token is already expired or about to expire, check immediately
  if (refreshTime <= 0) {
    checkTokenExpiration();
    return;
  }

  // Schedule check before token expires
  const refreshTimeMs = refreshTime * 1000; // Convert to milliseconds
  const refreshInMinutes = Math.round(refreshTimeMs / 1000 / 60);
  const refreshAt = new Date(Date.now() + refreshTimeMs).toLocaleString();
  console.log(
    `[TokenRefresh] ✓ Token check scheduled in ${refreshInMinutes} minutes (at ${refreshAt})`
  );

  scheduledCheckTimeout = setTimeout(() => {
    checkTokenExpiration();
    scheduledCheckTimeout = null;
  }, refreshTimeMs);
}

/**
 * Handle token refresh by sending message to all clients
 */
async function handleTokenRefresh() {
  try {
    // Send message to all clients (tabs/windows) to trigger refresh
    const clients = await self.clients.matchAll({
      includeUncontrolled: true,
      type: 'window',
    });

    if (clients.length === 0) {
      return;
    }

    clients.forEach((client) => {
      client.postMessage({
        type: 'TRIGGER_REFRESH_TOKEN',
        timestamp: Date.now(),
      });
    });
  } catch {
    // Silently fail; main thread will handle refresh if needed
  }
}

/**
 * Check token expiration by requesting main thread to verify
 * Service Worker cannot access React state/store directly
 */
async function checkTokenExpiration() {
  try {
    // Send message to main thread to check token
    const clients = await self.clients.matchAll({
      includeUncontrolled: true,
      type: 'window',
    });

    if (clients.length === 0) {
      return;
    }

    clients.forEach((client) => {
      client.postMessage({
        type: 'CHECK_TOKEN_EXPIRATION',
        timestamp: Date.now(),
      });
    });
  } catch {
    // Silently fail; main thread will handle refresh if needed
  }
}
