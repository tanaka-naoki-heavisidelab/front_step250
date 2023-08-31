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
    <ul class="flashes">
    <h2>登録情報</h2> 
    <li><%= data.username %></li>
    <li><%= data.email %></li>
    </ul>
    `;
    const html = ejs.render(template, { data: data });
    // console.info(html);
    document.getElementById('output').innerHTML = html;
  } else {

    const messages = [];
    messages.push(response.statusText)
    var template = `
    <ul class="flashes">
      <% for(var i=0; i<messages.length; i++) { %>
      <li>Error: <%= messages[i] %></li>
      <% } %>
    </ul>`;
    const html = ejs.render(template, { messages: messages });
    document.getElementById('output').innerHTML = html;
    console.error('Error:', response.statusText);
  }
}