// Import required built-in modules
const { createServer } = require("node:http");
const { extname } = require("node:path");

// Import custom modules, functions and variables
const logEE = require("./log-emitter");
const { fetchFile } = require("./fs-utils");

const {
  logTitle,
  logReqMethod,
  logResCode,
  logMessage,
  logFilePortURL,
  borderLine,
} = require("./log-utils");

const {
  PORT,
  HOST,
  VIEWS_DIR,
  CSS_DIR,
  JS_DIR,
  NOT_FOUND_VIEW,
  viewMap,
  redirectMap,
} = require("./config");

// Create an HTTP server
const server = createServer(async (req, res) => {
  const path = req.url;

  // Log the client request details to the console
  console.log(
    `${logTitle("Client request:")} [method: ${logReqMethod(
      req.method
    )}, requested url: ${logFilePortURL(req.url)}]`
  );
  console.log(borderLine);

  // Log the client request details to the file
  logEE.logFile(
    "clientRequest",
    "success",
    `method: "${req.method}", url: "${req.url}"`
  );

  if (extname(path) == ".css") {
    // Handle requests for CSS files
    const data = await fetchFile(CSS_DIR, path);
    res.statusCode = data ? 200 : 404;

    res.writeHead(res.statusCode, { "Content-Type": "text/css" });
    res.end(data && data);
  } else if (extname(path) == ".js") {
    // Handle requests for JS files
    const data = await fetchFile(JS_DIR, path);
    res.statusCode = data ? 200 : 404;

    res.writeHead(res.statusCode, { "Content-Type": "text/javascript" });
    res.end(data && data);
  } else {
    // Handle other requests
    const view = viewMap.get(path) || redirectMap.get(path) || NOT_FOUND_VIEW;
    res.statusCode = viewMap.has(path)
      ? 200
      : redirectMap.has(path)
      ? 301
      : 404;

    // Handle redirects
    if (res.statusCode == 301) {
      res.writeHead(res.statusCode, { Location: redirectMap.get(path) });
      res.end();
    } else {
      let data = await fetchFile(VIEWS_DIR, view);

      if (!data) {
        res.statusCode = 500;
        data = `
      <h1>Unexpected Error</h1>
      <p>Error code: ${res.statusCode}</p>
      <p>An error has occured and we're working to fix the problem! Will be up and running shortly</p>
      `;
      }

      // Set a cookie for view that includes "subscribe"
      view.includes("subscribe") &&
        res.setHeader("Set-Cookie", "cookieGreeting=hello I am a cookie");

      res.writeHead(res.statusCode, { "Content-Type": "text/html" });
      res.end(data);
    }
  }

  // Log the server response details to the console
  console.log(
    `${logTitle("Server response:")} [status code: ${logResCode(
      res.statusCode
    )}, status message: ${logMessage(res.statusMessage)}]`
  );
  console.log(borderLine);

  // Log the server response details to the file
  logEE.logFile(
    "serverResponse",
    res.statusCode >= 500
      ? "error"
      : res.statusCode == 404
      ? "warning"
      : res.statusCode == 301
      ? "redirect"
      : "success",
    `${res.statusCode} "${res.statusMessage}"`
  );
});

// Start the server and listen on the specified port and host
server.listen(PORT, HOST, () => {
  const message = "Server is listening on port";

  // Log the message to the console
  console.log(`${logMessage(message)}, ${logFilePortURL(PORT)}\n`);

  // Log the message to the file
  logEE.logFile("startServer", "sysInfo", `${message} ${PORT}`);
});
