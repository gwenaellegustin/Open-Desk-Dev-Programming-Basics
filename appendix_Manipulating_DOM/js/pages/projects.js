import { fetchContent } from "../lib/api.js";

async function main() {
  const content = await fetchContent("./../assets/data/", "content.json");
  const projectsContainer = document.getElementById("projects-container");
  const tagsArray = [];

  for (let i = 0; i < content.projects.length; i++) {
    createProject(i);
  }

  createTags(tagsArray);

  /////////////////////////////////////
  function createProject(i) {
    const container = document.createElement("div");
    container.classList.add("project-container");

    getAllTags(content.projects[i].tags);
    const title = createTitle(i);
    const image = createImage(i);
    createImage(i);
    container.appendChild(title);
    container.appendChild(image);
    projectsContainer.appendChild(container);
  }
  function createTitle(i) {
    const titleElement = document.createElement("h2");
    titleElement.innerText = content.projects[i].title;
    return titleElement;
  }
  function createImage(i) {
    const imageElement = document.createElement("img");
    const path = "./../assets/images/";
    imageElement.classList.add("thumb");
    const src = content.projects[i].images[0] + ".jpeg";
    imageElement.src = path + src;
    return imageElement;
  }
  /////////////////////////////////////

  function createTags(tagsArray) {
    const parentTagContainer = document.getElementById("tags-container");
    for (let i = 0; i < tagsArray.length; i++) {
      const tagButton = generateTagButton(tagsArray[i]);
      parentTagContainer.appendChild(tagButton);
    }
  }
  function getAllTags(tags) {
    for (let i = 0; i < tags.length; i++) {
      if (!tagsArray.includes(tags[i])) {
        tagsArray.push(tags[i]);
      }
    }
  }
  function generateTagButton(content) {
    const button = document.createElement("button");
    button.innerText = content;
    button.classList.add("tag");
    button.addEventListener("click", () => {
      onTagClickHandler(content);
    });
    return button;
  }
  function onTagClickHandler(tag) {
    projectsContainer.innerHTML = "";
    for (let i = 0; i < content.projects.length; i++) {
      if (content.projects[i].tags.includes(tag)) {
        createProject(i);
      }
    }
  }
}

window.onload = () => {
  main();
};
