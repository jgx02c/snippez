/**
 * @file This stores our database configuration.
 * @author Joshua Goodman
 */

// We define the configuration.
const config = {
  db: {
    host: 'db4free.net',
    port: '3306',
    user: 'cs3560dev',
    password: 'cs3560dev',
    database: 'cs3560dev',
    connectTimeout: 60000
  }
};

// We export the configuration.
module.exports = config;