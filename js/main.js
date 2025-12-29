// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const href = this.getAttribute("href");

    // Main 클릭 시 최상단으로 스크롤
    if (href === "#main") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      // Tech Stack 섹션의 경우 헤더 높이만큼 오프셋 추가
      if (href === "#tech") {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20; // 20px 추가 여백

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      } else {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
    }
  });
}, observerOptions);

document.querySelectorAll(".scroll-reveal").forEach((el) => {
  observer.observe(el);
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(30, 30, 30, 0.98)";
    header.style.boxShadow = "0 2px 25px rgba(0, 0, 0, 0.3)";
  } else {
    header.style.background = "rgba(30, 30, 30, 0.95)";
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.2)";
  }
});

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Typing animation for hero text (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Parallax effect for background image
let ticking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const body = document.body;

  // 배경 이미지가 스크롤에 따라 천천히 움직이도록 설정
  const parallaxSpeed = 0.3;
  const yPos = -(scrolled * parallaxSpeed);
  body.style.backgroundPosition = `center ${yPos}px`;

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});

// Project modal functionality
let projectsData = [];

function buildDetailSection(projectId, section, sectionIndex) {
  // Handle new "items" structure for Achievements (Grouped Topic + Value + Description + Images)
  if (section.items && section.items.length > 0) {
    return `
      <div class="organic-section achievements-section" data-section="${section.id || sectionIndex}">
        <div class="section-content-wrapper">
          <div class="detail-section-header">
            <h3 class="section-title-main">${section.title || ""}</h3>
          </div>
          <div class="detail-section-body">
            ${section.summary ? `<p class="detail-summary">${section.summary}</p>` : ""}
            
            <div class="achievements-list">
              ${section.items.map((item, idx) => `
                <div class="achievement-card">
                  <div class="achievement-header">
                    <div class="achievement-title-group">
                      <div class="achievement-topic">${item.topic}</div>
                      <div class="achievement-value">${item.value}</div>
                    </div>
                  </div>
                  <div class="achievement-body">
                    ${Array.isArray(item.description)
        ? item.description.map(desc => `<p class="achievement-description">${desc}</p>`).join('')
        : `<p class="achievement-description">${item.description}</p>`
      }
                    ${item.images && item.images.length > 0 ? `
                      <div class="achievement-images">
                        ${item.images.map((img, imgIdx) => `
                          <figure class="achievement-image-wrapper" onclick="openAchievementImage('${projectId}', ${sectionIndex}, ${idx}, ${imgIdx})">
                            <img src="${img.path}" alt="${img.alt || ''}" class="achievement-image" />
                          </figure>
                        `).join('')}
                      </div>
                    ` : ''}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Legacy/Standard Render (for Intro, Role, Architecture, etc.)
  const summary = section.summary
    ? `<p class="detail-summary">${section.summary}</p>`
    : "";

  const bullets =
    section.bullets && section.bullets.length > 0
      ? `<ul class="detail-bullets">
          ${section.bullets.map((item) => `<li>${item}</li>`).join("")}
        </ul>`
      : "";

  const metrics =
    section.metrics && section.metrics.length > 0
      ? `<div class="detail-metrics">
          ${section.metrics
        .map(
          (metric) => `
                <div class="detail-metric-card ${metric.type || ""}">
                  <div class="metric-label">${metric.metric}</div>
                  <div class="metric-value">${metric.value}</div>
                </div>
              `
        )
        .join("")}
        </div>`
      : "";

  const images =
    section.images && section.images.length > 0
      ? `<div class="section-image-wrapper">
          <div class="detail-images">
            ${section.images
        .map(
          (img, idx) => `
                  <figure class="detail-image-card">
                    <img 
                      src="${img.path}" 
                      alt="${img.alt || ""}" 
                      class="detail-image" 
                      onclick="openImageModalFromSection('${projectId}', ${sectionIndex}, ${idx})"
                    />
                    ${img.caption
              ? `<figcaption class="detail-image-caption">${img.caption}</figcaption>`
              : ""
            }
                  </figure>
                `
        )
        .join("")}
          </div>
        </div>`
      : "";

  // Organic layout: Text on left, Images on right (if images exist)
  const hasImages = section.images && section.images.length > 0;

  if (hasImages) {
    return `
      <div class="organic-section has-images" data-section="${section.id || sectionIndex}">
        <div class="section-content-wrapper">
          <div class="detail-section-header">
            <h3 class="section-title-main">${section.title || ""}</h3>
          </div>
          <div class="detail-section-body">
            ${summary}
            ${metrics}
            ${bullets}
          </div>
        </div>
        ${images}
      </div>
    `;
  }

  return `
    <div class="organic-section" data-section="${section.id || sectionIndex}">
      <div class="section-content-wrapper">
        <div class="detail-section-header">
          <h3 class="section-title-main">${section.title || ""}</h3>
        </div>
        <div class="detail-section-body">
          ${summary}
          ${metrics}
          ${bullets}
        </div>
      </div>
    </div>
  `;
}

async function openProjectModal(projectId) {
  if (projectsData.length === 0) {
    projectsData = await loadProjectsData();
  }

  const project = projectsData.find((p) => p.id === projectId);
  if (!project) return;

  const modal = document.createElement("div");
  modal.className = "project-modal";

  const introSection =
    project.detailSections &&
    project.detailSections.find((s) => s.id === "intro");
  const architectureSection =
    project.detailSections &&
    project.detailSections.find((s) => s.id === "architecture");
  const roleSection =
    project.detailSections &&
    project.detailSections.find((s) => s.id === "role");
  const achievementsSection =
    project.detailSections &&
    project.detailSections.find((s) => s.id === "achievements");

  modal.innerHTML = `
        <div class="modal-overlay" onclick="closeProjectModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <div class="modal-header-content">
                    <h2>${project.title}</h2>
                    <div class="project-meta-header">
                        <span class="meta-item">
                            <strong>기간:</strong> ${project.period}
                        </span>
                        <span class="meta-item">
                            <strong>팀:</strong> ${project.team}
                        </span>
                    </div>
                </div>
                <button class="modal-close" onclick="closeProjectModal()">×</button>
            </div>
            <div class="modal-body">
                ${project.overview
      ? `
                <div class="project-overview-section">
                  <h3 class="section-title-main"> 프로젝트 소개</h3>
                  <p class="overview-text">${project.overview}</p>
                </div>
                `
      : ""
    }

                ${introSection
      ? buildDetailSection(projectId, introSection, 0)
      : ""
    }

                <div class="project-technologies">
                    <h3 class="section-title-sub">사용 기술</h3>
                    <div class="tech-list">
                        ${project.technologies
      .map(
        (tech) =>
          `<span class="tech-item ${tech.level}">${tech.name}</span>`
      )
      .join("")}
                    </div>
                </div>

                ${roleSection
      ? buildDetailSection(projectId, roleSection, 1)
      : ""
    }
                
                ${architectureSection
      ? buildDetailSection(projectId, architectureSection, 2)
      : ""
    }

                ${achievementsSection
      ? buildDetailSection(projectId, achievementsSection, 3)
      : ""
    }
                
                ${project.files && project.files.length > 0
      ? `
                <div class="project-files">
                    <h3 class="section-title-sub">관련 자료</h3>
                    <div class="files-list">
                        ${project.files
        .map((file) => {
          const isHtml =
            file.type && file.type.toLowerCase() === "html";
          const fileIcon = isHtml ? "🌐" : "📄";
          return `
                            <a href="${file.path}" class="file-link" ${isHtml
              ? 'target="_blank" rel="noopener noreferrer"'
              : "download"
            }>
                                <span class="file-icon">${fileIcon}</span>
                                <span class="file-name">${file.name}</span>
                                <span class="file-type">${file.type ? file.type.toUpperCase() : ""
            }</span>
                            </a>
                        `;
        })
        .join("")}
                    </div>
                </div>
                `
      : ""
    }
                
                ${project.links && project.links.length > 0
      ? `
                <div class="project-links">
                    <h3 class="section-title-sub">관련 링크</h3>
                    <div class="links-list">
                        ${project.links
        .map(
          (link) =>
            `<a href="${link.url}" class="project-link" target="_blank">${link.name}</a>`
        )
        .join("")}
                    </div>
                </div>
                `
      : ""
    }
            </div>
        </div>
    `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Animate modal
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

function closeProjectModal() {
  const modal = document.querySelector(".project-modal");
  if (modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(modal);
      document.body.style.overflow = "";
    }, 300);
  }
}

// Image modal functionality
let currentImageIndex = 0;
let currentProjectImages = [];

function showImageModal(images, startIndex = 0) {
  if (!images || images.length === 0) return;
  currentProjectImages = images;
  currentImageIndex = startIndex;

  const image = currentProjectImages[currentImageIndex];
  const imageModal = document.createElement("div");
  imageModal.className = "image-modal";

  const hasMultiple = currentProjectImages.length > 1;
  const prevButton = hasMultiple
    ? `<button class="image-nav-btn image-nav-prev" onclick="navigateImage(-1)">‹</button>`
    : "";
  const nextButton = hasMultiple
    ? `<button class="image-nav-btn image-nav-next" onclick="navigateImage(1)">›</button>`
    : "";
  const imageCounter = hasMultiple
    ? `<div class="image-counter">${currentImageIndex + 1} / ${currentProjectImages.length
    }</div>`
    : "";

  imageModal.innerHTML = `
    <div class="image-modal-overlay" onclick="closeImageModal()"></div>
    <div class="image-modal-content">
      <button class="image-modal-close" onclick="closeImageModal()">×</button>
      ${prevButton}
      <img src="${image.path}" alt="${image.caption || image.alt || ""
    }" class="modal-full-image" />
      ${nextButton}
      ${imageCounter}
      ${image.caption
      ? `<p class="modal-image-caption">${image.caption}</p>`
      : ""
    }
    </div>
  `;

  document.body.appendChild(imageModal);
  document.body.style.overflow = "hidden";

  const handleKeyPress = (e) => {
    if (e.key === "ArrowLeft") navigateImage(-1);
    if (e.key === "ArrowRight") navigateImage(1);
    if (e.key === "Escape") closeImageModal();
  };
  window.addEventListener("keydown", handleKeyPress);
  imageModal._keyHandler = handleKeyPress;

  setTimeout(() => {
    imageModal.classList.add("show");
  }, 10);
}

async function openImageModalFromSection(projectId, sectionIndex, imageIndex) {
  if (projectsData.length === 0) {
    projectsData = await loadProjectsData();
  }

  const project = projectsData.find((p) => p.id === projectId);
  const section =
    project &&
      project.detailSections &&
      project.detailSections.length > sectionIndex
      ? project.detailSections[sectionIndex]
      : null;
  if (!section || !section.images || section.images.length === 0) return;

  showImageModal(section.images, imageIndex);
}

async function openAchievementImage(projectId, sectionIndex, itemIndex, imageIndex) {
  if (projectsData.length === 0) {
    projectsData = await loadProjectsData();
  }

  const project = projectsData.find((p) => p.id === projectId);
  const section =
    project &&
      project.detailSections &&
      project.detailSections.length > sectionIndex
      ? project.detailSections[sectionIndex]
      : null;

  if (!section || !section.items || !section.items[itemIndex] || !section.items[itemIndex].images) return;

  showImageModal(section.items[itemIndex].images, imageIndex);
}

function navigateImage(direction) {
  if (currentProjectImages.length === 0) return;

  currentImageIndex += direction;
  if (currentImageIndex < 0)
    currentImageIndex = currentProjectImages.length - 1;
  if (currentImageIndex >= currentProjectImages.length) currentImageIndex = 0;

  const image = currentProjectImages[currentImageIndex];
  const modalContent = document.querySelector(".image-modal-content");
  const img = modalContent.querySelector(".modal-full-image");
  const caption = modalContent.querySelector(".modal-image-caption");
  const counter = modalContent.querySelector(".image-counter");

  img.style.opacity = "0";

  setTimeout(() => {
    img.src = image.path;
    img.alt = image.caption || image.alt || "";
    if (caption) {
      caption.textContent = image.caption || "";
      caption.style.display = image.caption ? "block" : "none";
    }
    if (counter) {
      counter.textContent = `${currentImageIndex + 1} / ${currentProjectImages.length
        }`;
    }
    img.style.opacity = "1";
  }, 150);
}

function closeImageModal() {
  const imageModal = document.querySelector(".image-modal");
  if (imageModal) {
    if (imageModal._keyHandler) {
      window.removeEventListener("keydown", imageModal._keyHandler);
    }
    imageModal.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(imageModal);
      document.body.style.overflow = "";
      currentImageIndex = 0;
      currentProjectImages = [];
    }, 300);
  }
}

// Data loading functions
async function loadProjectsData() {
  try {
    const response = await fetch("assets/data/projects.json");
    const data = await response.json();
    return data.projects;
  } catch (error) {
    console.error("Error loading projects data:", error);
    return [];
  }
}

async function loadSkillsData() {
  try {
    const response = await fetch("assets/data/skills.json");
    const data = await response.json();
    return data.skills;
  } catch (error) {
    console.error("Error loading skills data:", error);
    return {};
  }
}

async function loadExperienceData() {
  try {
    const response = await fetch("assets/data/experience.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error loading experience data:", error);
    return {};
  }
}

// Dynamic content rendering functions
function renderProjects(projects) {
  const projectsContainer = document.querySelector(".projects-grid");
  if (!projectsContainer) return;

  projectsContainer.innerHTML = projects
    .map(
      (project) => `
        <div class="project-card scroll-reveal" onclick="openProjectModal('${project.id
        }')">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <div class="project-meta">
                    <span class="project-period">${project.period}</span>
                    <span class="project-team">${project.team}</span>
                </div>
                <p class="project-description">${project.description}</p>
                <div class="project-tech-preview">
                    ${project.technologies
          .slice(0, 4)
          .map(
            (tech) =>
              `<span class="tech-tag ${tech.level}">${tech.name}</span>`
          )
          .join("")}
                    ${project.technologies.length > 4
          ? `<span class="tech-tag more">+${project.technologies.length - 4
          }</span>`
          : ""
        }
                </div>
                <div class="project-footer">
                    <span class="view-details">자세히 보기 →</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function renderSkills(skills) {
  const skillsContainer = document.querySelector(".tech-categories");
  if (!skillsContainer) return;

  skillsContainer.innerHTML = Object.entries(skills)
    .map(
      ([category, items]) => `
        <div class="tech-category scroll-reveal">
            <h3>${getCategoryTitle(category)}</h3>
            <div class="tech-list">
                ${items
          .map(
            (item) =>
              `<span class="tech-item ${item.level}">${item.name}</span>`
          )
          .join("")}
            </div>
        </div>
    `
    )
    .join("");
}

function getCategoryTitle(category) {
  const titles = {
    languages: "Language",
    backend: "Backend",
    database: "DBMS",
    devops: "DevOps",
    collaboration: "Communication",
    os: "OS",
  };
  return titles[category] || category;
}

function renderEducation(education) {
  const educationContainer = document.querySelector(".education-list");
  if (!educationContainer) return;

  educationContainer.innerHTML = education
    .map(
      (edu) => `
        <div class="edu-item">
          <div class="edu-title">${edu.title}</div>
          <div class="edu-period">${edu.period}</div>
          <p>${edu.description}</p>
          ${edu.grade ? `<div class="edu-grade">학점: ${edu.grade}</div>` : ""}
        </div>
      `
    )
    .join("");
}

// Hero sequential animation
function initHeroAnimations() {
  const heroElements = document.querySelectorAll(".hero-animate");

  // Add animate class to trigger animations
  heroElements.forEach((element) => {
    element.classList.add("animate");
  });
}

// Image slider functionality
function initImageSlider() {
  const slideImages = document.querySelectorAll(".slide-image");
  let currentIndex = 0;

  function updateSlidePositions() {
    slideImages.forEach((img, index) => {
      // Remove all position classes
      img.classList.remove(
        "current",
        "next",
        "prev",
        "hidden",
        "sliding-out",
        "sliding-in"
      );

      // Calculate relative position
      const relativeIndex =
        (index - currentIndex + slideImages.length) % slideImages.length;

      // Apply appropriate class based on position
      if (relativeIndex === 0) {
        img.classList.add("current");
      } else if (relativeIndex === 1) {
        img.classList.add("next");
      } else {
        // Hide the third image completely to avoid showing it on the right
        img.classList.add("hidden");
      }
    });
  }

  function slideToNext() {
    const currentImage = slideImages[currentIndex];
    const nextIndex = (currentIndex + 1) % slideImages.length;
    const nextImage = slideImages[nextIndex];

    // Set up sliding animation
    currentImage.classList.remove("current");
    currentImage.classList.add("sliding-out");

    nextImage.classList.remove("next");
    nextImage.classList.add("sliding-in");

    // After animation completes, update positions
    setTimeout(() => {
      currentIndex = nextIndex;
      updateSlidePositions();
    }, 1000); // Match CSS transition duration
  }

  // Initialize slider
  updateSlidePositions();

  // Start auto-slide (change every 3 seconds)
  setInterval(slideToNext, 3000);
}

// Initialize all interactive elements
document.addEventListener("DOMContentLoaded", async () => {
  // Start hero animations after a short delay
  setTimeout(() => {
    initHeroAnimations();
  }, 300);

  // Initialize image slider
  initImageSlider();

  // Load and render dynamic content
  const [projects, skills, experience] = await Promise.all([
    loadProjectsData(),
    loadSkillsData(),
    loadExperienceData(),
  ]);

  // Render dynamic content
  renderProjects(projects);
  renderSkills(skills);
  renderEducation(experience.education || []);

  // Re-initialize scroll reveal for dynamically loaded content
  document.querySelectorAll(".scroll-reveal").forEach((el) => {
    observer.observe(el);
  });
});
