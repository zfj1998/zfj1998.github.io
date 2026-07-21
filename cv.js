const root = document.documentElement;
root.classList.remove("no-js");
const themeButton = document.querySelector(".cv-theme");
const printButton = document.querySelector(".cv-print");
const emailButton = document.querySelector(".cv-email");
const themeColor = document.querySelector('meta[name="theme-color"]');

function currentTheme() {
  return root.dataset.theme === "dark" ? "dark" : "light";
}

function updateThemeUI() {
  const next = currentTheme() === "dark" ? "light" : "dark";
  themeButton.setAttribute("aria-label", `Switch to ${next} theme`);
  themeButton.textContent = currentTheme() === "dark" ? "Light theme" : "Dark theme";
  themeColor.content = currentTheme() === "dark" ? "#101311" : "#f5f3ee";
}

themeButton.addEventListener("click", () => {
  const next = currentTheme() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
    localStorage.setItem("theme-mode", next);
  } catch {
    // Theme remains active for this page.
  }
  updateThemeUI();
});

printButton.addEventListener("click", () => window.print());

emailButton.addEventListener("click", async () => {
  const email = ["fengji", ".", "zhang", String.fromCharCode(64), "my", ".", "cityu", ".", "edu", ".", "hk"].join("");
  try {
    await navigator.clipboard.writeText(email);
    emailButton.textContent = "Email copied";
  } catch {
    emailButton.textContent = "Copy unavailable";
  }
  window.setTimeout(() => (emailButton.textContent = "Copy email"), 1800);
});

updateThemeUI();
