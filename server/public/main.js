async function submitForm() {
  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password1 = document.getElementById('password1').value;
  const password2 = document.getElementById('password2').value;

  const response = await fetch(baseUrl + '/fast/register/', {
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
  if (response.ok) {
    const data = await response.json();
    console.log(data);
    window.location.href = `/user?username=${data.username}&email=${data.email}`;

  } else {
    console.error('Error:', response.statusText);
  }
}