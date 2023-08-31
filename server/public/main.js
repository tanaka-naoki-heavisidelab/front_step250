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

  if (response.ok) {
    const data = await response.json();

    var template = `
    <h2>登録情報</h2> 
    <%= data.username %>
    <%= data.email %>
    `;

    const html = ejs.render(template, { data: data });
    console.info(html);
    document.getElementById('output').innerHTML = html;

  } else {
    console.error('Error:', response.statusText);
  }

  // if (response.ok) {
  //   const data = await response.json();
  //   console.log(data);

  //   const messages = [data.username, data.email];
  //   const template = document.getElementById('template').innerHTML;
  //   const html = ejs.render(template, { messages });

  //   document.getElementById('output').innerHTML = html;
  // } else {
  //   console.error('Error:', response.statusText);
  // }
  // if (response.ok) {
  //   const data = await response.json();
  //   console.log(data);
  //   window.location.href = `/user?username=${data.username}&email=${data.email}`;

  // } else {
  //   console.error('Error:', response.statusText);
  // }
}