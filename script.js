(function () {
  const KEY = "cj-portfolio-content-v1";

  if (document.body.classList.contains("portfolio-page")) {
    const defaults = {
      name: "Cris Jan B. Juevesano",
      role: "IT Student · Aspiring Developer",
      profileImage: "images/profile.jpg",
      intro: "I build practical digital experiences and enjoy turning ideas into useful, well-organized solutions.",
      about: "I am an Information Technology student interested in software development, IoT, and interactive applications. I enjoy learning new tools, solving technical problems, and collaborating on projects that connect technology with real needs.",
      location: "Cebu, Philippines",
      email: "crisjanjuevesano@gmail.com",
      github: "https://github.com/JuevesanoCJ",
      linkedin: "https://www.linkedin.com/in/cris-jan-juevesano-243a9a340",
      skillsDev: "HTML, CSS, JavaScript, C",
      skillsTools: "Git, GitHub, Visual Studio Code, Unity",
      skillsInterest: "IoT, AI and Computer Vision, Networking, Game Development",
      education: "Bachelor of Science in Information Technology",
      school: "Cebu Eastern College",
      educationDates: "2023–2027 · Expected graduation",
      resume: "",
      certificates: "",
      footer: "Built with curiosity and a commitment to continuous learning.",
      projects: [
        { title: "HydroPenDroid", description: "An AI-driven IoT capstone concept exploring targeted, water-efficient automated cleaning. Add your own verified implementation details, prototype images, and testing results.", tech: "AI, IoT, Computer Vision", status: "Capstone project", url: "" },
        { title: "Dakop-Dakop", description: "A 3D tag-game project focused on character movement, camera controls, animations, and AI-controlled characters.", tech: "Unity, C#", status: "Game development", url: "" },
        { title: "Offline Survey Application", description: "A mobile-friendly survey application concept for collecting and organizing responses when connectivity is limited.", tech: "HTML, CSS, JavaScript", status: "Web application", url: "" }
      ]
    };

    function readContent() {
      try {
        return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
      } catch {
        return defaults;
      }
    }

    const data = readContent();
    const $ = (id) => document.getElementById(id);

    function safeUrl(value, allowed = ["http:", "https:"]) {
      if (!value || typeof value !== "string") return "";
      const trimmed = value.trim();
      if (!trimmed || trimmed.startsWith("#")) return "";
      if (trimmed.startsWith("/") || trimmed.startsWith("./") || trimmed.startsWith("../") || !trimmed.includes(":")) {
        return trimmed;
      }
      try {
        const url = new URL(trimmed);
        return allowed.includes(url.protocol) ? url.href : "";
      } catch {
        return "";
      }
    }

    function setText(id, value) {
      const element = $(id);
      if (element) {
        element.textContent = value || "";
      }
    }

    function renderTags(id, value) {
      const host = $(id);
      if (!host) return;
      host.innerHTML = "";
      (value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => {
          const span = document.createElement("span");
          span.className = "skill-tag";
          span.textContent = item;
          host.appendChild(span);
        });
    }

    const profileImage = $("profileImage");
    const profileFallback = $("profileFallback");
    const brandMark = $("brandMark");
    const footerBrandMark = $("footerBrandMark");
    const profileSrc = safeUrl(data.profileImage, ["http:", "https:"]);

    function applyProfileBadge(element) {
      if (!element) return;
      if (profileSrc) {
        element.style.backgroundImage = `url("${profileSrc}")`;
        element.style.backgroundSize = "118% auto";
        element.style.backgroundPosition = "center 22%";
        element.style.backgroundRepeat = "no-repeat";
        element.textContent = "";
        element.setAttribute("aria-label", `${data.name || "Portfolio profile"} avatar`);
      } else {
        element.style.backgroundImage = "";
        element.textContent = (data.name || "CJ").split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "CJ";
        element.removeAttribute("aria-label");
      }
    }

    if (profileSrc) {
      profileImage.src = profileSrc;
      profileImage.alt = `${data.name || "Portfolio profile"} portrait`;
      profileImage.style.objectPosition = "center 22%";
      profileImage.hidden = false;
      profileFallback.hidden = true;
    } else {
      profileImage.removeAttribute("src");
      profileImage.hidden = true;
      profileFallback.hidden = false;
      profileFallback.textContent = (data.name || "CJ").split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "CJ";
    }

    applyProfileBadge(brandMark);
    applyProfileBadge(footerBrandMark);

    setText("brandName", data.name);
    $("brandName").insertAdjacentHTML("beforeend", '<span class="brand-sub">PORTFOLIO</span>');
    setText("heroTitle", "Building useful things with technology.");
    $("heroTitle").replaceChildren(document.createTextNode("Building useful things with "));
    const accent = document.createElement("span");
    accent.textContent = "technology.";
    $("heroTitle").appendChild(accent);

    setText("heroLocation", data.location);
    setText("heroRole", data.role);
    setText("aboutPreview", data.intro);
    setText("aboutLead", data.role);
    setText("aboutBody", data.about);
    setText("aboutLocation", data.location);
    renderTags("skillsDev", data.skillsDev);
    renderTags("skillsTools", data.skillsTools);
    renderTags("skillsInterest", data.skillsInterest);
    setText("educationDates", data.educationDates);
    setText("educationTitle", data.education);
    setText("schoolName", data.school);
    setText("footerBrand", data.name);
    setText("footerNote", data.footer);
    setText("year", new Date().getFullYear());

    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ? data.email : "";
    const emailLink = $("contactEmail");
    emailLink.textContent = (email || "Add your email in admin") + " ↗";
    emailLink.href = email ? "mailto:" + email : "#";

    for (const [id, key, label] of [["githubLink", "github", "GitHub ↗"], ["linkedinLink", "linkedin", "LinkedIn ↗"]]) {
      const link = $(id);
      const url = safeUrl(data[key]);
      link.href = url || "#";
      link.textContent = url ? label : label.replace(" ↗", " (not set)");
    }

    const resume = safeUrl(data.resume);
    const resumeLink = $("resumeLink");
    resumeLink.hidden = !resume;
    if (resume) {
      resumeLink.href = resume;
    }

    const certs = (data.certificates || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    const certWrap = $("certificatesWrap");
    const certList = $("certificatesList");
    certWrap.hidden = !certs.length;
    certList.replaceChildren(
      ...certs.map((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        return li;
      })
    );

    const projects = (data.projects || []).filter((project) => project.title);
    setText("projectCount", String(projects.length).padStart(2, "0") + " PROJECTS");
    const grid = $("projectsGrid");
    grid.innerHTML = "";
    const symbols = ["✳", "⌘", "▧", "↗"];

    projects.forEach((project, index) => {
      const card = document.createElement("article");
      card.className = "project-card";

      const visual = document.createElement("div");
      visual.className = "project-visual visual-" + (index % 4);
      const num = document.createElement("span");
      num.className = "project-index";
      num.textContent = String(index + 1).padStart(2, "0");
      const symbol = document.createElement("span");
      symbol.className = "project-symbol";
      symbol.textContent = symbols[index % symbols.length];
      const status = document.createElement("span");
      status.className = "project-status";
      status.textContent = project.status || "Project";
      visual.append(num, symbol, status);

      const body = document.createElement("div");
      body.className = "project-body";
      const heading = document.createElement("h3");
      heading.textContent = project.title;
      const description = document.createElement("p");
      description.textContent = project.description || "Project description coming soon.";

      const tech = document.createElement("div");
      tech.className = "project-tech";
      (project.tech || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
        .forEach((item) => {
          const tag = document.createElement("span");
          tag.textContent = item;
          tech.appendChild(tag);
        });

      body.append(heading, description, tech);
      const url = safeUrl(project.url);
      if (url) {
        const link = document.createElement("a");
        link.className = "project-link";
        link.href = url;
        link.target = "_blank";
        link.rel = "noreferrer";
        link.textContent = "View project ↗";
        body.appendChild(link);
      }

      card.append(visual, body);
      grid.appendChild(card);
    });

    $("menuToggle").addEventListener("click", () => {
      const open = $("navLinks").classList.toggle("is-open");
      $("menuToggle").setAttribute("aria-expanded", String(open));
    });

    $("navLinks").querySelectorAll("a").forEach((anchor) => {
      anchor.addEventListener("click", () => {
        $("navLinks").classList.remove("is-open");
        $("menuToggle").setAttribute("aria-expanded", "false");
      });
    });
  }

  if (document.body.classList.contains("admin-page")) {
    const defaults = {
      name: "Cris Jan B. Juevesano",
      role: "IT Student · Aspiring Developer",
      profileImage: "images/profile.jpg",
      intro: "I build practical digital experiences and enjoy turning ideas into useful, well-organized solutions.",
      about: "I am an Information Technology student interested in software development, IoT, and cybersecurity. I enjoy learning new tools, solving technical problems, and collaborating on projects that connect technology with real needs.",
      location: "Cebu, Philippines",
      email: "crisjanjuevesano@gmail.com",
      github: "https://github.com/",
      linkedin: "www.linkedin.com/in/cris-jan-juevesano-243a9a340",
      skillsDev: "HTML, CSS, JavaScript, C",
      skillsTools: "Git, GitHub, Visual Studio Code, Unity",
      skillsInterest: "IoT, Cybersecurity, vibe coding, Game Development",
      education: "Bachelor of Science in Information Technology",
      school: "Cebu Eastern College",
      educationDates: "2023–2027 · Expected graduation",
      resume: "",
      certificates: "",
      footer: "Built with curiosity and a commitment to continuous learning.",
      projects: [
        { title: "HydroPenDroid", description: "An AI-driven IoT capstone concept exploring targeted, water-efficient automated cleaning. Add your own verified implementation details, prototype images, and testing results.", tech: "AI, IoT, Computer Vision", status: "Capstone project", url: "" },
        { title: "Dakop-Dakop", description: "A 3D tag-game project focused on character movement, camera controls, animations, and AI-controlled characters.", tech: "Unity, C#", status: "Game development", url: "" },
        { title: "Offline Survey Application", description: "A mobile-friendly survey application concept for collecting and organizing responses when connectivity is limited.", tech: "HTML, CSS, JavaScript", status: "Web application", url: "" }
      ]
    };

    const form = document.getElementById("portfolioForm");
    const projectList = document.getElementById("projectsEditor");
    const template = document.getElementById("projectTemplate");
    const status = document.getElementById("saveStatus");

    function loadData() {
      try {
        return { ...defaults, ...JSON.parse(localStorage.getItem(KEY) || "{}") };
      } catch {
        return structuredClone(defaults);
      }
    }

    function addProject(project = {}) {
      const node = template.content.firstElementChild.cloneNode(true);
      node.querySelectorAll("[data-field]").forEach((input) => {
        input.value = project[input.dataset.field] || "";
      });
      node.querySelector(".remove-project").addEventListener("click", () => {
        node.remove();
        renumberProjects();
        status.textContent = "Unsaved changes";
      });
      projectList.appendChild(node);
      renumberProjects();
    }

    function renumberProjects() {
      [...projectList.children].forEach((element, index) => {
        element.querySelector(".project-number").textContent = `Project ${String(index + 1).padStart(2, "0")}`;
      });
    }

    function populate(data) {
      for (const [key, value] of Object.entries(data)) {
        if (key === "projects") continue;
        const field = form.elements.namedItem(key);
        if (field) field.value = value ?? "";
      }

      projectList.innerHTML = "";
      (data.projects || []).forEach(addProject);
    }

    function collect() {
      const data = {};
      ["name", "role", "profileImage", "intro", "about", "location", "email", "github", "linkedin", "skillsDev", "skillsTools", "skillsInterest", "education", "school", "educationDates", "resume", "certificates", "footer"].forEach((key) => {
        data[key] = form.elements.namedItem(key).value.trim();
      });
      data.projects = [...projectList.children]
        .map((element) => {
          const project = {};
          element.querySelectorAll("[data-field]").forEach((input) => {
            project[input.dataset.field] = input.value.trim();
          });
          return project;
        })
        .filter((project) => project.title);
      return data;
    }

    let current = loadData();

    form.addEventListener("input", () => {
      status.textContent = "Unsaved changes";
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      current = collect();
      localStorage.setItem(KEY, JSON.stringify(current));
      status.textContent = "Saved in this browser ✓";
    });

    document.getElementById("addProject").addEventListener("click", () => addProject({ title: "New project" }));
    document.getElementById("resetBtn").addEventListener("click", () => {
      if (!confirm("Reset all fields to the sample content? This replaces the saved content in this browser.")) return;
      current = structuredClone(defaults);
      localStorage.setItem(KEY, JSON.stringify(current));
      populate(current);
      status.textContent = "Sample content restored";
    });

    populate(current);
  }
})();
