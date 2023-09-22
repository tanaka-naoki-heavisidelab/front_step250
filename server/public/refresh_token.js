let refreshTimer;
let inactivityTimer;
const REFRESH_INTERVAL = 5 * 1000;
const INACTIVITY_DURATION = 10 * 1000; // For testing
// const REFRESH_INTERVAL = 10 * 60 * 1000; // 10 minutes
// const INACTIVITY_DURATION = 30 * 60 * 1000; // 30 minutes

async function refreshToken() {
  try {
    const response = await fetch(`${baseUrl}/fast/token_refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    });

    if (!response.ok) {
      displayError(response);
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
  }
}

function startRefreshCycle() {
  if (!refreshTimer) {
    refreshTimer = setInterval(refreshToken, REFRESH_INTERVAL);
  }
}

function handleActivity() {
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
    inactivityTimer = null;
  }

  // Start the inactivity timer again
  inactivityTimer = setTimeout(() => {
    if (refreshTimer) {
      clearInterval(refreshTimer);
      refreshTimer = null;
      console.log('Token refresh halted due to inactivity. Please re-login.');
      // Here you can add logic to prompt the user to re-login or do other necessary actions.
      fetch('/logout', {
        method: 'GET',
        credentials: 'include'  // Important to send and receive cookies
      })
        .then(response => {
          if (response.ok) {
            // Handle successful logout, e.g., redirect to login page
            window.location.href = '/login';
          } else {
            // Handle error
            console.error('Logout failed');
          }
        })
        .catch(error => {
          console.error('Error during logout:', error);
        });
    }
  }, INACTIVITY_DURATION);
}

async function checkUserStatus() {
  try {
    const response = await fetch(`${baseUrl}/fast/user`, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      },
      credentials: 'include'
    });

    if (response.ok) {
      // If the user is logged in, start monitoring their activity and start the refresh cycle
      document.addEventListener('mousemove', handleActivity);
      document.addEventListener('keydown', handleActivity);
      startRefreshCycle();
      handleActivity();  // Start the inactivity timer
    } else {
      // Otherwise, handle the situation where the user isn't logged in
      stopRefreshAndListeners();
    }
  } catch (error) {
    console.error('Error checking user status:', error);
  }
}

function stopRefreshAndListeners() {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
  if (inactivityTimer) {
    clearTimeout(inactivityTimer);
    inactivityTimer = null;
  }
  document.removeEventListener('mousemove', handleActivity);
  document.removeEventListener('keydown', handleActivity);
}

// Start by checking the user's login status
checkUserStatus();
