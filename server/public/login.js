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


}