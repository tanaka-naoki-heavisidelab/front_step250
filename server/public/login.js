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
    const data_1st = await response_1st.json();
    console.log(data_1st)
    const response_2nd = await fetch(`${baseUrl}/fast/token_refresh?refresh_token=${data_1st.access_token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    if (response_2nd.ok) {
      const data_2nd = await response_2nd.json();
      // Save the long-term token in the Cookie    
      // HttpOnlyではoauth2_schemeが受け付けない。headerにAuthorization:を付与する必要があり
      // JSで制御できねばならない。
      // Secureを付けるとHTTPSのみになる。
      // document.cookie = `userToken=${data_2nd.access_token}; HttpOnly; SameSite=Strict`;
      document.cookie = `userToken=${data_2nd.access_token}`;
      const headers = {
        'Authorization': `Bearer ${data_2nd.access_token}`
      };
      window.location.href = '/home';
    } else {
      const messages = [];
      const errorData = await response_2nd.json();
      messages.push(response_2nd.status)
      messages.push(response_2nd.statusText)
      const errorDetail = errorData && errorData.detail ? errorData.detail : "An error occurred";
      messages.push(errorDetail);
      console.error(errorDetail);
      const html = ejs.render(templates.spaTemplate, { messages: messages });
      document.getElementById('CLIENT_SIDE_RENDER').innerHTML = html;
    }
  } else {
    const messages = [];
    const errorData = await response_1st.json();
    messages.push(response_1st.status)
    messages.push(response_1st.statusText)
    messages.push(errorData.detail)
    console.error(errorData.detail)
    const html = ejs.render(templates.spaTemplate, { messages: messages });
    document.getElementById('CLIENT_SIDE_RENDER').innerHTML = html;
  }
}
