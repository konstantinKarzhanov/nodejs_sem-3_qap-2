import { createNavbar } from "./navbar.js";

const currentURLPath = window.location.pathname;
const title = currentURLPath.split("/").slice(-1)[0];
const body = document.querySelector("body");

const viewArr = ["home", "about", "contact", "products", "subscribe"];
const homeView = `/${viewArr[0]}`;

const header = document.createElement("header");
const main = document.createElement("main");
const h1 = document.createElement("h1");

main.classList.add("container", "container--pall");
h1.classList.add("text-center");

body.insertAdjacentElement("afterbegin", header);
body.insertBefore(main, body.children[0].nextElementSibling);
main.appendChild(h1);

header.appendChild(createNavbar(viewArr, homeView, currentURLPath));

h1.textContent =
  viewArr.indexOf(title) != -1
    ? `${title[0].toUpperCase() + title.slice(1)}`
    : "404: Page Not Found";
