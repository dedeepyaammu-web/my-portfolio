
// ---------- 1. Mobile navigation menu ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  // Toggle the menu open/closed
  const isOpen = navLinks.classList.toggle("open");

  // Update accessibility information
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after clicking a navigation link
document.querySelectorAll("#navLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    menuToggle.textContent = "☰";
  });
});

// ---------- 2. Automatically update the footer year ----------
document.getElementById("year").textContent =
  new Date().getFullYear();

// ---------- 3. Scroll reveal animations ----------
// Add reveal classes to the main content sections
document.querySelectorAll(
  ".hero-content, .hero-visual, .about-grid, .skill-card, .project-card, .contact-card"
).forEach((element) => {
  element.classList.add("reveal");
});

// Animate elements when they enter the visible screen
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
} else {
  // Fallback for older browsers
  document.querySelectorAll(".reveal").forEach((element) => {
    element.classList.add("visible");
  });
}

// ---------- 4. Contact form validation ----------
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// Replace this with your real email address before using the form
const portfolioEmail = "your-email@example.com";

contactForm.addEventListener("submit", (event) => {
  // Prevent the form from submitting to a server
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all the fields.";
    return;
  }

  // Validate the email using the browser's built-in input validation
  const emailInput = document.getElementById("email");

  if (!emailInput.checkValidity()) {
    formStatus.textContent = "Please enter a valid email address.";
    emailInput.focus();
    return;
  }

  // Check whether the default email address was replaced
  if (portfolioEmail === "your-email@example.com") {
    formStatus.textContent =
      "Form validated! Replace the sample email in script.js to enable email preparation.";
    return;
  }

  // Open the visitor's default email application with the message filled in
  const subject = encodeURIComponent(
    "Portfolio enquiry from " + name
  );

  const body = encodeURIComponent(
    "Name: " + name +
    "\nEmail: " + email +
    "\n\nMessage:\n" + message
  );

  formStatus.textContent =
    "Opening your email application. Please review and send the email.";

  window.location.href =
    "mailto:" + portfolioEmail +
    "?subject=" + subject +
    "&body=" + body;
});
