<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Emerald Cove Properties</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #f9f9f9;
      color: #333;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      background: #fff;
      border-bottom: 1px solid #ddd;
    }
    header .logo {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    header .tagline {
      font-size: 12px;
      color: #555;
      font-weight: 500;
    }
    .layout {
      display: flex;
      height: calc(100vh - 50px);
    }
    .sidebar {
      width: 220px;
      background: #222;
      color: #fff;
      padding: 20px 0;
    }
    .sidebar button {
      display: flex;
      align-items: center;
      width: 100%;
      padding: 10px 20px;
      border: none;
      background: none;
      color: #ccc;
      cursor: pointer;
      text-align: left;
      font-size: 15px;
    }
    .sidebar button.active, .sidebar button:hover {
      background: #333;
      color: #fff;
    }
    main {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
    }
    .card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #f1f1f1;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .card button {
      background: #006644;
      color: #fff;
      border: none;
      padding: 10px 15px;
      border-radius: 8px;
      cursor: pointer;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
    }
    th, td {
      text-align: left;
      padding: 10px 15px;
      border-bottom: 1px solid #eee;
    }
    th {
      background: #f9f9f9;
      color: #666;
    }
    tr:hover {
      background: #f5f5f5;
    }
  </style>
</head>
<body>

  <header>
    <div class="logo">
      <strong>EMERALD COVE</strong>
      <span class="tagline">PROPERTIES</span>
    </div>
    <div class="tagline">WHERE EVERY HOME IS A TREASURE</div>
    <div>👤</div>
  </header>

  <div class="layout">
    <div class="sidebar">
      <button class="active">Dashboard</button>
      <button>Clients</button>
      <button>Projects</button>
      <button>Settings</button>
    </div>
    <main>
      <h1>Dashboard</h1>

      <div class="card">
        <div>
          <div>Total Clients</div>
          <div id="totalClients" style="font-size: 28px; font-weight: bold;">4</div>
        </div>
        <button onclick="addClient()">+ Add Client</button>
      </div>

      <h2>Clients</h2>
      <table id="clientsTable">
        <thead>
          <tr>
            <th>Name</th><th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>John Doe</td><td>john.doe@example.com</td></tr>
          <tr><td>Jane Smith</td><td>jane.smith@example.com</td></tr>
          <tr><td>Joe Bloggs</td><td>joe.bloggs@example.com</td></tr>
          <tr><td>Sarah Johnson</td><td>sarah.johnson@example.com</td></tr>
        </tbody>
      </table>
    </main>
  </div>

  <script>
    function addClient() {
      const name = prompt("Enter client name:");
      const email = prompt("Enter client email:");
      if (name && email) {
        const tbody = document.querySelector("#clientsTable tbody");
        const row = document.createElement("tr");
        row.innerHTML = `<td>${name}</td><td>${email}</td>`;
        tbody.appendChild(row);

        // update count
        document.getElementById("totalClients").textContent =
          tbody.querySelectorAll("tr").length;
      }
    }
  </script>

</body>
</html>
