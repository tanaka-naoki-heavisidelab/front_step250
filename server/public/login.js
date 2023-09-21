
// /fast/tokenは成功した。
// async function submitForm() {
//   const username = document.getElementById('username').value;
//   const password = document.getElementById('password').value;

//   const response_1st = await fetch(baseUrl + '/fast/token', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
//   });
//   if (response_1st.ok) {
//     window.location.href = '/home';
//   } else {
//     displayError(response_1st);
//   }
// }


async function submitForm() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response_1st = await fetch(baseUrl + '/fast/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  });

  if (response_1st.ok) {
    const response_2nd = await fetch(`${baseUrl}/fast/token_refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      credentials: 'include'
    });

    if (response_2nd.ok) {
      window.location.href = '/home';
    } else {
      displayError(response_2nd);
    }
  } else {
    displayError(response_1st);
  }
}


function displayError(response) {
  // Handle errors: extract the message from the response and display it to the user
  response.json().then(errorData => {
    const messages = [];
    messages.push(response.status);
    messages.push(response.statusText);
    messages.push(errorData.detail);
    console.error(errorData.detail);
    // Assuming you have a mechanism to display these messages to the user
    // E.g., using ejs.render
    const html = ejs.render(templates.spaTemplate, { messages: messages });
    document.getElementById('CLIENT_SIDE_RENDER').innerHTML = html;
  });
}
