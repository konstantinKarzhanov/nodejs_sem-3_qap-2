// Create a fragment element to efficiently build the navbar
const fragment = new DocumentFragment();

// Create HTML elements
const navbar = document.createElement("nav");
const navList = document.createElement("ul");

// Add CSS classes to created elements
navList.classList.add(
  "container",
  "container--pall",
  "flex",
  "flex--ai-c",
  "flex--jc-c",
  "flex--gap"
);

// Define a function to create the navigation bar
const createNavbar = (views, homeView, currentPath) => {
  // Iterate through the list of views
  views.forEach((item) => {
    const path = `/${item}`;

    // Create list items and links for each view
    const navListItem = document.createElement("li");
    const viewLink = document.createElement("a");

    // Add CSS classes for navigation links
    viewLink.classList.add("link--nav");

    // Set the link's href attribute
    viewLink.href = path;

    // Add the "active" class to the link if it matches the current path
    path == "/" + homeView && currentPath == "/"
      ? viewLink.classList.add("active")
      : path == currentPath && viewLink.classList.add("active");

    // Set the text content of the link
    navListItem.appendChild(viewLink).textContent = item;

    // Append the list item to the fragment
    fragment.append(navListItem);
  });

  // Append the navigation list to the navbar
  navbar.appendChild(navList).appendChild(fragment);
  return navbar;
};

// Export function
export { createNavbar };
