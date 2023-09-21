if (!window.tokenRefreshRegistered) {
  let tokenExpirationTimer;

  async function refreshToken() {
    const token = getCookie('access_token'); // 'userToken' to 'access_token'

    if (!token) {
      console.log("Access token not found.");
      return;
    }

    const response = await fetch(`${baseUrl}/fast/token_refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `refresh_token=${token}`
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log("Token refreshed successfully");
      // Set the next refresh timer based on the new expiration time
      startRefreshTimer(new Date(responseData.expires_at * 1000));
    } else {
      console.log("Failed to refresh token");
    }
  }

  function startRefreshTimer(expirationDate) {
    const now = new Date();
    const delay = expirationDate - now - 5 * 60 * 1000; // Refresh 5 minutes before expiration

    if (tokenExpirationTimer) {
      clearTimeout(tokenExpirationTimer);
    }

    tokenExpirationTimer = setTimeout(() => {
      document.addEventListener('mousemove', handleActivity);
      document.addEventListener('keydown', handleActivity);
    }, delay);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  function handleActivity() {
    document.removeEventListener('mousemove', handleActivity);
    document.removeEventListener('keydown', handleActivity);
    refreshToken();
  }

  // Start the initial timer based on the initial expiration date of the access token
  const initialExpirationDate = new Date(getCookie('expires_at') * 1000);
  startRefreshTimer(initialExpirationDate);

  window.tokenRefreshRegistered = true;
}


// if (!window.tokenRefreshRegistered) {
//   let tokenExpirationTimer;
//   const refreshTokenDelay = 60 * 60 * 1000;

//   async function refreshToken() {
//     const token = getCookie('userToken');

//     // Check if token exists
//     if (!token) {
//       console.log("User token not found.");
//       return;
//     }

//     const response = await fetch(`${baseUrl}/fast/token_refresh`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       },
//       body: `refresh_token=${token}`
//     });

//     if (response.ok) {
//       console.log("Token refreshed successfully");
//     } else {
//       console.log("Failed to refresh token");
//     }

//     // After refreshing, set the next timer
//     startRefreshTimer();
//   }

//   function startRefreshTimer() {
//     if (tokenExpirationTimer) {
//       clearTimeout(tokenExpirationTimer);
//     }

//     tokenExpirationTimer = setTimeout(() => {
//       if (getCookie('userToken')) {
//         document.addEventListener('mousemove', handleActivity);
//         document.addEventListener('keydown', handleActivity);
//       }
//     }, refreshTokenDelay);
//   }

//   function getCookie(name) {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//     return null;  // Return null if the cookie is not found
//   }

//   function handleActivity() {
//     if (getCookie('userToken')) {
//       document.removeEventListener('mousemove', handleActivity);
//       document.removeEventListener('keydown', handleActivity);
//       refreshToken();
//     }
//   }

//   // Start the initial timer
//   startRefreshTimer();

//   window.tokenRefreshRegistered = true;
// }
