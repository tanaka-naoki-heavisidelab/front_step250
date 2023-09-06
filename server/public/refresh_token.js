if (!window.tokenRefreshRegistered) {
  let tokenExpirationTimer;
  const refreshTokenDelay = 60 * 60 * 1000;

  async function refreshToken() {
    const token = getCookie('userToken');

    // Check if token exists
    if (!token) {
      console.log("User token not found.");
      return;
    }

    const response = await fetch(`${baseUrl}/fast/token_refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `refresh_token=${token}`
    });

    if (response.ok) {
      console.log("Token refreshed successfully");
    } else {
      console.log("Failed to refresh token");
    }

    // After refreshing, set the next timer
    startRefreshTimer();
  }

  function startRefreshTimer() {
    if (tokenExpirationTimer) {
      clearTimeout(tokenExpirationTimer);
    }

    tokenExpirationTimer = setTimeout(() => {
      if (getCookie('userToken')) {
        document.addEventListener('mousemove', handleActivity);
        document.addEventListener('keydown', handleActivity);
      }
    }, refreshTokenDelay);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;  // Return null if the cookie is not found
  }

  function handleActivity() {
    if (getCookie('userToken')) {
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      refreshToken();
    }
  }

  // Start the initial timer
  startRefreshTimer();

  window.tokenRefreshRegistered = true;
}
