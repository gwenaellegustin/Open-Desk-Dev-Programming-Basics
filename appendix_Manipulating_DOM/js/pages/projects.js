import { fetchContent } from "../lib/api.js";

async function main() {
  const content = await fetchContent("./../assets/data/", "content.json");

  const parentContainer = document.getElementById("projects-container");

  for (let i = 0; i < content.projects.length; i++) {
    const element = content.projects[i];
    const titleElement = document.createElement("h2");
    titleElement.innerText = content.projects[i].title;
    parentContainer.appendChild(titleElement);
  }
}

window.onload = () => {
  main();
};
