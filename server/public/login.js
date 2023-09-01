async function submitForm() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const response = await fetch(baseUrl + '/fast/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email, password: password })
  });


  if (response.ok) {
    const data = await response.json()
    console.log(data)
  }


}