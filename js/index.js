// Import the function from the custom module
import { createNavbar } from "./navbar.js";

// Get the current URL path from the window object
const currentURLPath = window.location.pathname;

// Extract the last part of the URL path to determine the h1-title of the current page
const title = currentURLPath.split("/").slice(-1)[0];

// Get a reference to the document's body element
const body = document.querySelector("body");

// Define an array of views and identify the view for the home page
const viewArr = ["home", "about", "contact", "products", "subscribe", "sixth"];
const homeView = viewArr[0];

// Create HTML elements
const header = document.createElement("header");
const main = document.createElement("main");
const h1 = document.createElement("h1");

// Add CSS classes to created elements
main.classList.add("container", "container--pall");
h1.classList.add("text-center");

// Add elements into the document's body
body.insertAdjacentElement("afterbegin", header);
body.insertBefore(main, body.children[0].nextElementSibling);
main.appendChild(h1);

// Create and insert a navigation bar into the header element
header.appendChild(createNavbar(viewArr, homeView, currentURLPath));

// Set the text content of the h1-title based on the title variable
h1.textContent =
  title == ""
    ? `${homeView[0].toUpperCase() + homeView.slice(1)} Page`
    : viewArr.indexOf(title) != -1
    ? `${title[0].toUpperCase() + title.slice(1)} Page`
    : "404: Page Not Found";
