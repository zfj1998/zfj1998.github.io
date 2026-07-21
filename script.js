const root = document.documentElement;
root.classList.remove("no-js");

const body = document.body;
const themeButton = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = [...siteNav.querySelectorAll('a[href^="#"]')];
const mobileMenu = matchMedia("(max-width: 860px)");
const toast = document.querySelector(".toast");
let toastTimer;

function currentTheme() {
  return root.dataset.theme === "dark" ? "dark" : "light";
}

function updateThemeUI() {
  const theme = currentTheme();
  const next = theme === "dark" ? "light" : "dark";
  themeButton.setAttribute("aria-label", `Switch to ${next} theme`);
  themeButton.setAttribute("aria-pressed", String(theme === "light"));
  themeButton.querySelector(".theme-symbol").textContent = theme === "dark" ? "☼" : "☾";
  themeButton.querySelector(".theme-label").textContent = next[0].toUpperCase() + next.slice(1);
  themeColor.content = theme === "dark" ? "#0b0d0c" : "#f4f3ee";
}

function setTheme(theme) {
  const safeTheme = theme === "dark" ? "dark" : "light";
  root.dataset.theme = safeTheme;
  try {
    localStorage.setItem("theme", safeTheme);
    localStorage.setItem("theme-mode", safeTheme);
  } catch {
    // The selected theme still applies for this page view.
  }
  updateThemeUI();
}

function syncMenuA11y() {
  siteNav.inert = mobileMenu.matches && !body.classList.contains("menu-open");
}

function toggleMenu(open) {
  body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuToggle.textContent = open ? "Close" : "Menu";
  syncMenuA11y();
}

function announce(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2200);
}

async function copyText(text, message) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }
  announce(message);
}

themeButton.addEventListener("click", () => {
  setTheme(currentTheme() === "dark" ? "light" : "dark");
});

menuToggle.addEventListener("click", () => {
  const open = !body.classList.contains("menu-open");
  toggleMenu(open);
  if (open) window.setTimeout(() => navLinks[0]?.focus(), 150);
});

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.hash);
    if (!target) return;

    event.preventDefault();
    toggleMenu(false);
    target.focus({ preventScroll: true });
    target.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
    history.pushState(null, "", link.hash);
    scheduleActiveSectionUpdate();
  });
});

mobileMenu.addEventListener?.("change", () => toggleMenu(false));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("menu-open")) {
    toggleMenu(false);
    menuToggle.focus();
  }
});

const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
let activeSectionFrame;

function setActiveNavigation(section) {
  navLinks.forEach((link) => {
    const active = section && link.getAttribute("href") === `#${section.id}`;
    link.classList.toggle("active", Boolean(active));
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function updateActiveSection() {
  activeSectionFrame = undefined;
  const documentHeight = document.documentElement.scrollHeight;
  const atPageEnd = window.scrollY + window.innerHeight >= documentHeight - 2;
  const headerHeight = document.querySelector(".site-header")?.offsetHeight || 64;
  const activationLine = headerHeight + Math.min(window.innerHeight * 0.2, 160);
  let current = atPageEnd ? sections.at(-1) : null;

  if (!current) {
    for (const section of sections) {
      if (section.getBoundingClientRect().top > activationLine) break;
      current = section;
    }
  }

  setActiveNavigation(current);
}

function scheduleActiveSectionUpdate() {
  if (activeSectionFrame !== undefined) return;
  activeSectionFrame = requestAnimationFrame(updateActiveSection);
}

window.addEventListener("scroll", scheduleActiveSectionUpdate, { passive: true });
window.addEventListener("resize", scheduleActiveSectionUpdate);
window.addEventListener("load", scheduleActiveSectionUpdate);
scheduleActiveSectionUpdate();

const email = ["fengji", ".", "zhang", String.fromCharCode(64), "my", ".", "cityu", ".", "edu", ".", "hk"].join("");
document.querySelectorAll(".email-action").forEach((button) => {
  button.addEventListener("click", () => copyText(email, "Email address copied."));
});

const citations = {
  awa: {
    title: "To Answer or to Abstain",
    bibtex: String.raw`@misc{zhang2026answerabstain,
  title={To Answer or to Abstain: Mitigating Search-Agent Hallucinations via Abstention-Aware Reinforcement Learning},
  author={Zhang, Fengji and Fan, Tianyu and Zheng, Yuxiang and Niu, Xinyao and Huang, Chengen and Keung, Jacky and Chen, Bei},
  year={2026},
  eprint={2607.10738},
  archivePrefix={arXiv},
  primaryClass={cs.LG},
  url={https://arxiv.org/abs/2607.10738}
}`,
  },
  a2search: {
    title: "A²Search",
    bibtex: String.raw`@inproceedings{zhang2026a2search,
  title={A^2Search: Ambiguity-Aware Question Answering with Reinforcement Learning},
  author={Zhang, Fengji and Niu, Xinyao and Ying, Chengyang and Lin, Guancheng and Hao, Zhongkai and Fan, Zhou and Huang, Chengen and Keung, Jacky and Chen, Bei and Lin, Junyang},
  booktitle={International Conference on Learning Representations},
  year={2026},
  url={https://arxiv.org/abs/2510.07958}
}`,
  },
  humanevalv: {
    title: "HumanEval-V",
    bibtex: String.raw`@article{zhang2026humanevalv,
  title={HumanEval-V: Systematic Evaluation of Visual Reasoning in Large Multimodal Models for Code Generation},
  author={Zhang, Fengji and Wu, Linquan and Bai, Huiyu and Lin, Guancheng and Li, Xiao and Yu, Xiao and Wang, Yue and Chen, Bei and Keung, Jacky},
  journal={ACM Transactions on Software Engineering and Methodology},
  year={2026},
  doi={10.1145/3813804},
  url={https://doi.org/10.1145/3813804}
}`,
  },
  repocoder: {
    title: "RepoCoder",
    bibtex: String.raw`@inproceedings{zhang-etal-2023-repocoder,
  title={RepoCoder: Repository-Level Code Completion Through Iterative Retrieval and Generation},
  author={Zhang, Fengji and Chen, Bei and Zhang, Yue and Keung, Jacky and Liu, Jin and Zan, Daoguang and Mao, Yi and Lou, Jian-Guang and Chen, Weizhu},
  booktitle={Proceedings of the 2023 Conference on Empirical Methods in Natural Language Processing},
  year={2023},
  pages={2471--2484},
  publisher={Association for Computational Linguistics},
  doi={10.18653/v1/2023.emnlp-main.151},
  url={https://aclanthology.org/2023.emnlp-main.151/}
}`,
  },
  codet: {
    title: "CodeT",
    bibtex: String.raw`@inproceedings{chen2023codet,
  title={CodeT: Code Generation with Generated Tests},
  author={Chen, Bei and Zhang, Fengji and Nguyen, Anh and Zan, Daoguang and Lin, Zeqi and Lou, Jian-Guang and Chen, Weizhu},
  booktitle={International Conference on Learning Representations},
  year={2023},
  url={https://openreview.net/forum?id=ktrw68Cmu9c}
}`,
  },
};

const citationDialog = document.querySelector("#citation-dialog");
const citationTitle = document.querySelector("#citation-title");
const citationCode = document.querySelector("#citation-code");
const citationClose = document.querySelector(".dialog-close");
const citationCopy = document.querySelector(".citation-copy");

document.querySelectorAll(".cite-button").forEach((button) => {
  button.addEventListener("click", () => {
    const citation = citations[button.dataset.citeKey];
    if (!citation) return;
    citationTitle.textContent = citation.title;
    citationCode.textContent = citation.bibtex;
    citationDialog.showModal();
  });
});

citationClose.addEventListener("click", () => citationDialog.close());
citationCopy.addEventListener("click", () => {
  copyText(citationCode.textContent, "BibTeX copied.");
});

citationDialog.addEventListener("click", (event) => {
  const rect = citationDialog.getBoundingClientRect();
  const outside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;
  if (outside) citationDialog.close();
});

syncMenuA11y();
updateThemeUI();
