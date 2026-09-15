const $ = (selector) => document.querySelector(selector);

// Render repeatable content from data.js, so content and presentation stay separate.
$("#skills-grid").innerHTML = portfolioData.skills.map(([title, tools], index) => `<article class="skill-card"><span>0${index + 1}</span><h3>${title}</h3><p>${tools}</p></article>`).join("");

// Education is a vertical timeline (same layout as Experience/Projects): a line runs
// top-to-bottom, oldest first, each entry with a slot reserved for a school/college photo.
$("#education-block").innerHTML = `
  <span class="education-label">Education</span>
  <div class="education-timeline">
    ${portfolioData.educationHistory.map(entry => `
      <div class="education-item">
        <article class="education-entry reveal" data-tilt-intensity="0.45">
          <div class="education-content">
            <span class="education-stage">${entry.stage}</span>
            <div class="education-heading">
              <h3>${entry.school}</h3>
              <span>${entry.duration}</span>
            </div>
            <p>${entry.detail}</p>
            <p>${entry.univ}</p>
            <p>${entry.place}</p>
          </div>
          <div class="education-thumb">
            ${entry.photo ? `<img src="${entry.photo}" alt="${entry.school} campus photo" loading="lazy" />` : `<span class="education-thumb-icon">🏫</span><span>Photo coming soon</span>`}
          </div>
        </article>
      </div>
    `).join("")}
  </div>

  <div class="coursework">
    <span class="coursework-label">Relevant coursework</span>
    <div class="coursework-grid">
      ${portfolioData.coursework.map(item => `
        <div class="coursework-item" data-tilt-intensity="0.4">
          <span class="coursework-icon" aria-hidden="true">${item.icon}</span>
          <h4>${item.title}</h4>
          <p>${item.blurb}</p>
        </div>
      `).join("")}
    </div>
  </div>
`;



// Projects share the experience section's timeline layout, with a placeholder thumbnail
// area until real screenshots are added, and an optional hoverable award badge.
$("#projects-grid").innerHTML = portfolioData.projects.map(project => `<div class="project-item"><article class="project-card reveal" data-tilt-intensity="0.45"><div class="project-body"><span class="project-kind">${project.type}</span><div class="project-meta"><span>${project.stack.join(" · ")}</span><span>${project.date}</span></div><h3>${project.title}</h3>${project.award ? `<a class="project-award" href="${project.award.link}" target="_blank" rel="noreferrer"><span class="award-icon">🏆</span>${project.award.label}<span class="award-preview"><img src="${project.award.image}" alt="${project.award.label} certificate" loading="lazy" /><span class="award-preview-label">View certificate ↗</span></span></a>` : ""}<p class="project-desc">${project.description}</p><div class="project-tags">${project.stack.map(tag => `<span>${tag}</span>`).join("")}</div><div class="project-cta"><a href="${project.github}" target="_blank" rel="noreferrer" aria-label="${project.title} source code">GitHub ↗</a><a href="${project.live}" target="_blank" rel="noreferrer" aria-label="${project.title} live demo">Live ↗</a></div></div><div class="project-thumb">${project.thumbnail ? `<img src="${project.thumbnail}" alt="${project.title} screenshot" loading="lazy" /><a class="thumb-view-button" href="${project.live && project.live !== "#" ? project.live : project.github}" target="_blank" rel="noreferrer">View project ↗</a>` : `<span class="project-thumb-icon">🖼</span><span>Screenshot coming soon</span>`}</div></article></div>`).join("");

// Certifications render as a gallery: each card names the skill it proves, describes
// the course, and reserves space for the actual certificate image.
$("#certifications-list").innerHTML = portfolioData.certifications.map(cert => `<article class="certification-card reveal" data-tilt-intensity="0.45"><span class="cert-skill">${cert.skill}</span><h3>${cert.title}</h3><p class="cert-issuer">${cert.issuer}</p><div class="cert-proof">${cert.image ? `<img src="${cert.image}" alt="${cert.title} certificate" loading="lazy" /><a class="cert-view-button" href="${cert.link}" target="_blank" rel="noreferrer">
  View certificate ↗
</a>` : `<span class="cert-proof-icon">🎓</span><span>Certificate coming soon</span>`}</div><p class="cert-description">${cert.description}</p></article>`).join("");

$("#year").textContent = new Date().getFullYear();

// Theme choice is saved on this device, which prevents an unwanted flash on future visits.
const themeButton = $(".theme-toggle");
const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") document.body.classList.add("light");
function updateThemeButton() { themeButton.textContent = document.body.classList.contains("light") ? "☾" : "☼"; themeButton.setAttribute("aria-label", `Switch to ${document.body.classList.contains("light") ? "dark" : "light"} theme`); }
updateThemeButton();
themeButton.addEventListener("click", () => { document.body.classList.toggle("light"); localStorage.setItem("portfolio-theme", document.body.classList.contains("light") ? "light" : "dark"); updateThemeButton(); });

// Mobile navigation uses a real button and aria-expanded for screen-reader support.
const navToggle = $(".nav-toggle"), navLinks = $(".nav-links");
navToggle.addEventListener("click", () => { const open = navToggle.getAttribute("aria-expanded") === "true"; navToggle.setAttribute("aria-expanded", !open); navLinks.classList.toggle("open", !open); });
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => { navToggle.setAttribute("aria-expanded", "false"); navLinks.classList.remove("open"); }));

// Subtle entrance animation; content remains visible if animations are disabled.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); } }), { threshold: .12 }).observe && document.querySelectorAll(".reveal").forEach(el => new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")), {threshold: .12}).observe(el));
else document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));

// Local chatbot: predictable, free, and private. Its facts come only from data.js.
// const launcher = $(".chat-launcher"), panel = $("#chat-panel"), closeChat = $(".chat-close"), messages = $("#chat-messages"), chatForm = $("#chat-form"), chatInput = $("#chat-input");
// function addMessage(text, sender) { const bubble = document.createElement("p"); bubble.className = `message ${sender}`; bubble.textContent = text; messages.append(bubble); messages.scrollTop = messages.scrollHeight; }
// function toggleChat(open) { panel.classList.toggle("open", open); panel.setAttribute("aria-hidden", !open); launcher.setAttribute("aria-expanded", open); if (open) { if (!messages.children.length) addMessage(`Hi! I’m ${portfolioData.name}'s portfolio assistant. Ask about skills, projects, education, or how to get in touch.`, "bot"); chatInput.focus(); } }
// launcher.addEventListener("click", () => toggleChat(!panel.classList.contains("open"))); closeChat.addEventListener("click", () => toggleChat(false));
// function answer(question) { const q = question.toLowerCase(); if (/skill|tech|stack|language/.test(q)) return `${portfolioData.name}'s core skills include ${portfolioData.skills.flatMap(s => s[1].split(", ")).join(", ")}.`; if (/project|work|build/.test(q)) return `Featured projects include ${portfolioData.projects.map(p => p.title).join(", ")}. The projects section includes their technologies and impact.`; if (/education|college|degree|study|cgpa/.test(q)) return `${portfolioData.name}'s education: ${portfolioData.education}.`; if (/experience|intern|training|aws|power bi/.test(q)) return `Ankit completed AWS Cloud training through the EduSkills AICTE Internship (Oct–Dec 2025) and a Power BI internship with Microsoft Elevate and AICTE (Dec 2025–Jan 2026).`; if (/certification|certificate|course|badge/.test(q)) return `${portfolioData.name}'s certifications include ${portfolioData.certifications.map(c => c.title).join("; ")}.`; if (/achievement|award|competition/.test(q)) return portfolioData.achievements.join(" "); if (/location|live|based/.test(q)) return `${portfolioData.name} is based in ${portfolioData.location}.`; if (/contact|email|hire|reach/.test(q)) return `You can write to ${portfolioData.email}, call ${portfolioData.phone}, or use the contact form below.`; if (/who|name|about/.test(q)) return `${portfolioData.name} is a ${portfolioData.role} who builds data-driven software and enjoys problem solving.`; return `I can help with Ankit's skills, projects, education, training, achievement, location, or contact details. Try asking one of those!`; }
// chatForm.addEventListener("submit", event => { event.preventDefault(); const question = chatInput.value.trim(); if (!question) return; addMessage(question, "user"); chatInput.value = ""; setTimeout(() => addMessage(answer(question), "bot"), 250); });

// // Formspree handles delivery without putting email credentials in public browser code.
// $("#contact-form").addEventListener("submit", event => { if (event.currentTarget.action.includes("YOUR_FORM_ID")) { event.preventDefault(); $("#form-note").textContent = "Add your Formspree form ID in index.html to activate sending."; } });

// AI CHATBOT
const launcher = $(".chat-launcher");
const panel = $("#chat-panel");
const closeChat = $(".chat-close");
const messages = $("#chat-messages");
const chatForm = $("#chat-form");
const chatInput = $("#chat-input");

// Stores the conversation during the current page session
let chatHistory = [];

function addMessage(text, sender) {
    const bubble = document.createElement("p");

    bubble.className = `message ${sender}`;
    bubble.textContent = text;

    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;

    return bubble;
}

function toggleChat(open) {
    panel.classList.toggle("open", open);
    panel.setAttribute("aria-hidden", String(!open));
    launcher.setAttribute("aria-expanded", String(open));

    if (open) {
        if (!messages.children.length) {
            addMessage(
                `Hi! I'm ${portfolioData.name}'s AI portfolio assistant. Ask me about my skills, projects, education, internships, certifications, or anything else about my portfolio.`,
                "bot"
            );
        }

        chatInput.focus();
    }
}

launcher.addEventListener("click", () => {
    toggleChat(!panel.classList.contains("open"));
});

closeChat.addEventListener("click", () => {
    toggleChat(false);
});

chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const question = chatInput.value.trim();

    if (!question) return;

    // Show user's message
    addMessage(question, "user");

    // Clear input
    chatInput.value = "";

    // Show temporary thinking message
    const thinkingBubble = addMessage("Thinking...", "bot");

    try {
        const response = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: question,

                // Send recent conversation history
                history: chatHistory,

                // Send the complete portfolio data
                portfolio: portfolioData
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Something went wrong");
        }

        // Replace "Thinking..." with Gemini's response
        thinkingBubble.textContent = data.reply;

        // Save conversation for follow-up questions
        chatHistory.push({
            role: "user",
            text: question
        });

        chatHistory.push({
            role: "model",
            text: data.reply
        });

        // Keep only the latest 10 messages
        if (chatHistory.length > 10) {
            chatHistory = chatHistory.slice(-10);
        }

    } catch (error) {
        console.error("Chatbot error:", error);

        thinkingBubble.textContent =
            "Sorry, I'm having trouble connecting to my AI right now.";
    }

    messages.scrollTop = messages.scrollHeight;
});