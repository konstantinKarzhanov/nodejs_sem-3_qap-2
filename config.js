// Define and export various configuration constants

// Port and host for the server
exports.PORT = 3000;
exports.HOST = "localhost";

// Directories for different types of files
exports.VIEWS_DIR = "views";
exports.CSS_DIR = "css";
exports.JS_DIR = "js";

// Default view for 404 errors
exports.NOT_FOUND_VIEW = "404.html";

// Map routes to their corresponding views
exports.viewMap = new Map([
  ["/", "index.html"],
  ["/home", "index.html"],
  ["/about", "about.html"],
  ["/contact", "contact.html"],
  ["/products", "products.html"],
  ["/subscribe", "subscribe.html"],
  ["/sixth", "sixth.html"],
]);

// Map routes to their redirect destinations
exports.redirectMap = new Map([
  ["/about-us", "/about"],
  ["/contact-us", "/contact"],
  ["/our-products", "/products"],
]);
