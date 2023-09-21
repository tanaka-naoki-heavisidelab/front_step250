let refreshTimer;
const INACTIVITY_DURATION = 10 * 60 * 1000; // 10 minutes, can be adjusted

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

function handleActivity() {
  // Reset the timer whenever the user does some activity
  if (refreshTimer) {
    clearTimeout(refreshTimer);
  }

  refreshTimer = setTimeout(() => {
    refreshToken();
  }, INACTIVITY_DURATION);
}

// Check if the user is currently logged in
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
      // If the user is logged in, start monitoring their activity
      document.addEventListener('mousemove', handleActivity);
      document.addEventListener('keydown', handleActivity);
    } else {
      // Otherwise, maybe handle the situation where the user isn't logged in
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keydown', handleActivity);
    }
  } catch (error) {
    console.error('Error checking user status:', error);
  }
}

// Start by checking the user's login status
checkUserStatus();
