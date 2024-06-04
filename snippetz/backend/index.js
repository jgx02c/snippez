/**
 * @file This defines the API entry point.
 * @author Joshua Goodman
 */

const express = require( "express" );
const app = express();
const appName = "API";
const domain = "localhost";
const port = 3560;
const scheme = "http";


process.on( 'SIGINT', () => {
  console.log( 'SIGINT!' );
  server.close( () => {
    console.log( `The ${appName} server will stop.` );
  } );
  process.exitCode = 0;
} );

// We use the JSON parser in Express.
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );

// We add headers for CORS.
app.use( ( request, response, next ) => {
  response.append( 'Access-Control-Allow-Origin', [ '*' ] );
  response.append( 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE' );
  response.append( 'Access-Control-Allow-Headers', 'Content-Type' );
  next();
} );

// We do an HTTP GET / request.
app.get( "/", ( request, response ) => {
  // We display a message to inform the user of usage.
  response.json( {
    message: "USAGE: Please specify a path with the table to query. A request for /login/ queries the Login table."
  } );
} );

// We specify routers with corresponding routes in the next block.
const appointmentRouter = require( "./routes/appointment" );
const departmentRouter = require( "./routes/department" );
const doctorRouter = require( "./routes/doctor" );
const loginRouter = require( "./routes/login" );
const patientRouter = require( "./routes/patient" );
const personRouter = require( "./routes/person" );

// We specify routes.
app.use( "/appointment", appointmentRouter );
app.use( "/department", departmentRouter );
app.use( "/doctor", doctorRouter );
app.use( "/login", loginRouter );
app.use( "/patient", patientRouter );
app.use( "/person", personRouter );

// We specify the callback function for requests that fail.
app.use( ( exception, request, response, next ) => {
  const statusCode = exception.statusCode || 500;
  console.error( exception.message, exception.stack );
  response.status( statusCode ).json( { message: exception.message } );
  return;
} );

// We listen for requests.
app.listen( port, () => {
  console.log( `The ${appName} server is now running on port ${port}.` );
  if( port === 80 ) {
    console.log( `Please open ${scheme}://${domain} in a browser.` );
  } else {
    console.log( `Please open ${scheme}://${domain}:${port} in a browser.` );
  }
} );