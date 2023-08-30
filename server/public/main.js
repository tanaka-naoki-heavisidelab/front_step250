async function submitForm() {
  const username = document.getElementById('username').value;
  const response = await fetch(baseUrl + '/fast/users/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username })
  });
  const data = await response.json();
  console.log(data);
}