// Load existing projects or empty array
let projects = JSON.parse(localStorage.getItem("projects")) || [];
let editingIndex = null;

const form = document.getElementById("airdropForm");
const tableBody = document.getElementById("tableBody");

// Render table
function renderTable() {
  tableBody.innerHTML = "";

  // Inside renderTable() in app.js
projects.forEach((p, index) => {
  tableBody.innerHTML += `
  <tr>
    <td><a href="project.html?id=${index}">${p.name}</a></td>
    <td>${p.chain}</td>
    <td>${p.status}</td>
    <td>${p.priority}</td>
    <td>$${p.capital}</td>
    <td>
      <button onclick="editProject(${index})">✏️ Edit</button>
      <button onclick="removeProject(${index})">❌ Delete</button>
    </td>
  </tr>
`;
  });

  localStorage.setItem("projects", JSON.stringify(projects));
}

// Add or update project
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const project = {
    name: document.getElementById("name").value.trim(),
    chain: document.getElementById("chain").value.trim(),
    status: document.getElementById("status").value,
    priority: document.getElementById("priority").value,
    capital: Number(document.getElementById("capital").value) || 0,
    notes: document.getElementById("notes").value.trim(),
    updatedAt: new Date().toISOString()
  };

  if (!project.name) return;

  if (editingIndex === null) {
    // New project
    projects.push(project);
  } else {
    // Update existing
    projects[editingIndex] = project;
    editingIndex = null;
  }

  form.reset();
  renderTable();
});

// Edit project
function editProject(index) {
  const p = projects[index];
  document.getElementById("name").value = p.name;
  document.getElementById("chain").value = p.chain;
  document.getElementById("status").value = p.status;
  document.getElementById("priority").value = p.priority;
  document.getElementById("capital").value = p.capital;
  document.getElementById("notes").value = p.notes;

  editingIndex = index;
}

// Delete project
function removeProject(index) {
  projects.splice(index, 1);
  renderTable();
}

// Initial render
renderTable();
