const templates = {
  spaTemplate: `
      <ul class="flashes">
      <% for(var i=0; i<messages.length; i++) { %>
      <li><%= messages[i] %></li>
      <% } %>
      </ul>
  `
}