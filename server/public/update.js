async function submitForm(task_id) {
  const title = document.getElementById('title').value;
  const detail = document.getElementById('detail').value;
  const end_time = document.getElementById('end_time').value + "T00:00:00";

  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('userToken='))
    .split('=')[1];

  const response = await fetch(baseUrl + `/fast/updatetask/${task_id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    },
    body: JSON.stringify({
      title: title,
      detail: detail,
      end_time: end_time
    })
  });

  const messages = [];
  if (response.ok) {
    const data = await response.json();
    messages.push("更新したタスク")
    messages.push(data.title)
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