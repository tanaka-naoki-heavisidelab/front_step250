async function submitForm() {
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password1 = document.getElementById('password1').value;
  const password2 = document.getElementById('password2').value;

  const response = await fetch(baseUrl + '/fast/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password1: password1,
      password2: password2
    })
  });

  const messages = [];
  if (response.ok) {
    const data = await response.json();
    messages.push("登録情報")
    messages.push(data.username)
    messages.push(data.email)
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