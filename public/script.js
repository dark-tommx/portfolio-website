const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const projectsList = document.getElementById("projectsList");
const projectForm = document.getElementById("projectForm");
const formMessage = document.getElementById("formMessage");
const contactEmail = document.getElementById("contactEmail");
const contactDescription = document.getElementById("contactDescription");
const API_BASE_URL = window.location.port === "5500" ? "http://localhost:3000" : "";

document.getElementById("year").textContent = new Date().getFullYear();

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    navLinks.classList.remove("open");
  }
});

async function loadProjects() {
  projectsList.innerHTML = '<p class="loading-text">Loading projects...</p>';

  try {
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    const projects = await response.json();

    if (!projects.length) {
      projectsList.innerHTML =
        '<p class="loading-text">No projects added yet. Use the form to add your first project.</p>';
      return;
    }

    projectsList.innerHTML = projects.map(createProjectCard).join("");
  } catch (error) {
    projectsList.innerHTML = '<p class="loading-text">Unable to load projects right now.</p>';
  }
}

function createProjectCard(project) {
  const technologies = project.technologies || [];
  const tags = technologies.map((tech) => `<span>${escapeHtml(tech)}</span>`).join("");
  const projectLink = project.link
    ? `<a class="project-link" href="${escapeAttribute(project.link)}" target="_blank" rel="noreferrer">Open project</a>`
    : "";

  return `
    <article class="project-card">
      <div class="project-card-header">
        <div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.description)}</p>
        </div>
        ${projectLink}
      </div>
      ${tags ? `<div class="tag-list">${tags}</div>` : ""}
      <div class="delete-row">
        <input type="password" placeholder="Password to delete" aria-label="Password to delete ${escapeAttribute(project.title)}" data-password-for="${project._id}">
        <button class="delete-button" type="button" onclick="deleteProject('${project._id}')">Delete</button>
      </div>
    </article>
  `;
}

projectForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessage.textContent = "Adding project...";

  const payload = {
    title: document.getElementById("projectTitle").value,
    description: document.getElementById("projectDescription").value,
    technologies: document.getElementById("projectTech").value,
    link: document.getElementById("projectLink").value,
    password: document.getElementById("projectPassword").value
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to add project");
    }

    projectForm.reset();
    formMessage.textContent = "Project added successfully.";
    loadProjects();
  } catch (error) {
    formMessage.textContent = error.message;
  }
});

async function deleteProject(id) {
  const passwordInput = document.querySelector(`[data-password-for="${id}"]`);
  const password = passwordInput.value;

  if (!password) {
    passwordInput.focus();
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/projects/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to delete project");
    }

    loadProjects();
  } catch (error) {
    alert(error.message);
  }
}

async function loadContact() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`);
    const contact = await response.json();

    contactEmail.textContent = contact.email;
    contactEmail.href = `mailto:${contact.email}`;
    contactDescription.textContent = contact.description;
  } catch (error) {
    contactDescription.textContent = "Contact details are unavailable right now.";
  }
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

loadProjects();
loadContact();
