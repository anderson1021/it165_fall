const serverConfig = { port: 3000, env: "development" };
serverConfig.port = 8080;     // Allowed: change a property.
serverConfig.timeout = 5000;  // Allowed: add a property.
console.log(serverConfig);
// { port: 8080, env: "development", timeout: 5000 }
// serverConfig = { port: 9000 }; // Uncommenting causes a TypeError.
