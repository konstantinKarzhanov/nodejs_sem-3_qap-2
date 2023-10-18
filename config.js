exports.PORT = 3000;
exports.HOST = "localhost";

exports.VIEWS_DIR = "views";
exports.CSS_DIR = "css";
exports.JS_DIR = "js";
exports.NOT_FOUND_VIEW = "404.html";

exports.viewMap = new Map([
  ["/", "index.html"],
  ["/home", "index.html"],
  ["/about", "about.html"],
  ["/contact", "contact.html"],
  ["/products", "products.html"],
  ["/subscribe", "subscribe.html"],
  ["/sixth", "sixth.html"],
]);

exports.redirectMap = new Map([
  ["/about-us", "/about"],
  ["/contact-us", "/contact"],
  ["/our-products", "/products"],
]);
