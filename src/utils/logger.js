const logger = {
  info: (message) => {
    console.log(`Info: ${message}`);
  },
  error: (message) => {
    console.error(`Error: ${message}`);
  },
  debug: (message) => {
    console.debug(`Debug: ${message}`);
  },
};

module.exports = logger;
