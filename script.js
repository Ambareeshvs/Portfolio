const GITHUB_USERNAME = "ambareeshvs";
const PROFILE_DETAILS = {
  journey: [
    {
      title: "Software Engineer",
      organization: "Unity Infotech Solution, Kochi",
      duration: "Jan 2023 - Present",
      summary:
        "Delivered secure and scalable fintech solutions with ASP.NET Core microservices, integrated OAuth 2.0 + Identity Server + Kong API Gateway, and improved monitoring and production reliability with Grafana.",
    },
    {
      title: "Associate Software Engineer",
      organization: "Unity Infotech Solution, Kochi",
      duration: "Jul 2022 - Dec 2022",
      summary:
        "Migrated a legacy ERP system to ASP.NET Core, developed a CRUD statement utility for SAMBA bank, and improved system performance and scalability by around 30%.",
    },
  ],
  education: [
    {
      title: "B.Tech in Computer Science and Engineering",
      issuer: "Government College of Engineering, Kannur",
      date: "Jun 2018 - Jun 2022 | CGPA: 8.75/10",
    },
  ],
  certifications: [
    {
      title: "TypeScript and ReactJS with Project",
      issuer: "OAK Academy",
      date: "In Progress",
    },
    {
      title: "Kong Gateway Foundations",
      issuer: "Kong",
      date: "Completed",
    },
    {
      title: "Programming with Google Go Specialization",
      issuer: "Coursera / UCI",
      date: "Completed",
    },
  ],
};

const projectsGrid = document.getElementById("projectsGrid");
const projectsMessage = document.getElementById("projectsMessage");
const journeyTimeline = document.getElementById("journeyTimeline");
const educationGrid = document.getElementById("educationGrid");
const certificationGrid = document.getElementById("certificationGrid");
const themeToggle = document.getElementById("themeToggle");

function formatDate(isoDate) {
  if (!isoDate) return "n/a";
  return new Date(isoDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function projectCard(repo) {
  const description = repo.description || "No description added yet.";
  const language = repo.language || "Mixed";

  return `
    <article class="project-card reveal">
      <h3>${repo.name}</h3>
      <p>${description}</p>
      <div class="meta">
        <span>${language}</span>
        <span>★ ${repo.stargazers_count}</span>
      </div>
      <div class="meta">
        <span>Updated ${formatDate(repo.updated_at)}</span>
      </div>
      <a class="project-link" href="${repo.html_url}" target="_blank" rel="noreferrer">View repository</a>
    </article>
  `;
}

function journeyItem(item) {
  return `
    <article class="timeline-item reveal">
      <div class="title-row">
        <h3>${item.title}</h3>
        <span class="duration">${item.duration}</span>
      </div>
      <p class="org">${item.organization}</p>
      <p class="summary">${item.summary}</p>
    </article>
  `;
}

function detailCard(item) {
  return `
    <article class="detail-card reveal">
      <h3>${item.title}</h3>
      <p class="issuer">${item.issuer}</p>
      <p class="date">${item.date}</p>
    </article>
  `;
}

function renderProfileDetails() {
  journeyTimeline.innerHTML = PROFILE_DETAILS.journey.map(journeyItem).join("");
  educationGrid.innerHTML = PROFILE_DETAILS.education.map(detailCard).join("");
  certificationGrid.innerHTML = PROFILE_DETAILS.certifications.map(detailCard).join("");
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  localStorage.setItem("theme", theme);
}

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") {
    applyTheme(savedTheme);
    return;
  }

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

function bindThemeToggle() {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    applyTheme(currentTheme === "dark" ? "light" : "dark");
  });
}

async function fetchGithubData() {
  try {
    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6&type=owner`
    );

    if (!reposRes.ok) {
      throw new Error("GitHub API request failed");
    }

    const repos = await reposRes.json();

    if (!repos.length) {
      projectsMessage.textContent =
        "No public repositories found yet. Add projects on GitHub and they will appear here.";
      return;
    }

    projectsGrid.innerHTML = repos.map(projectCard).join("");
    projectsMessage.textContent = "";
  } catch (error) {
    projectsMessage.textContent =
      "Could not load GitHub data right now. Please try again later.";
  }
}

renderProfileDetails();
initializeTheme();
bindThemeToggle();
fetchGithubData();
