const fragment = new DocumentFragment();
const navbar = document.createElement("nav");
const navList = document.createElement("ul");

navList.classList.add(
  "container",
  "container--pall",
  "flex",
  "flex--ai-c",
  "flex--jc-c",
  "flex--gap"
);

const createNavbar = (views, homeView, currentPath) => {
  views.forEach((item) => {
    const path = `/${item}`;
    const navListItem = document.createElement("li");
    const viewLink = document.createElement("a");

    viewLink.classList.add("link--nav");
    viewLink.href = path;

    path == "/" + homeView && currentPath == "/"
      ? viewLink.classList.add("active")
      : path == currentPath && viewLink.classList.add("active");

    navListItem.appendChild(viewLink).textContent = item;
    fragment.append(navListItem);
  });

  navbar.appendChild(navList).appendChild(fragment);
  return navbar;
};

export { createNavbar };
