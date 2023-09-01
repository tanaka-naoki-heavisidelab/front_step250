async function submitForm() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await fetch(baseUrl + '/fast/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  });


  if (response.ok) {
    const data = await response.json()
    console.log(data)
  }

  const messages = [];
  if (response.ok) {
    const data = await response.json();
    messages.push("ログイン成功")

    // Save the token in the Cookie    
    // document.cookie = `userToken=${data.access_token}; Secure; HttpOnly; SameSite=Strict`;
    document.cookie = `userToken=${data.access_token};`
    // Include the token in the headers for subsequent requests
    const headers = {
      'Authorization': `Bearer ${data.access_token}`
    };
    window.location.href = '/home';
  } else {
    const errorData = await response.json();
    messages.push(response.status)
    messages.push(response.statusText)
    messages.push(errorData.detail)
    console.error(errorData.detail)
  }

  const html = ejs.render(templates.spaTemplate, { messages: messages });
  document.getElementById('CLIENT_SIDE_RENDER').innerHTML = html;
}