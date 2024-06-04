/**
 * @file This routes requests for the Patient table.
 * @author Allan Manangan
 */

// We define requirements.
const express = require( "express" );
const helper = require( "../helper" );
const patient = require( "../services/patient" );

/*
 * This processes a request for one record from the Patient table.
 *
 */
async function one( request, response, next ) {
  // This message will be shown if there is an error.
  const message = "Please specify a record ID /i where i is an integer greater than or equal to one.";
  // We try to process the request.
  try {
    let parameter = Number.parseInt( request.params.id );
    // We check if the parameter is either a floating-point or an integer.
    if( typeof parameter === 'number' && !( Number.isNaN( parameter ) ) ) {
      // We check if the parameter is an integer.
      if( Number.isInteger( parameter ) ) {
        // The number is an integer greater than zero.
        if( parameter > 0 ) {
          // We get a record by its ID number.
          response.json( await patient.getOne( parameter ) );
        // The number is an integer less than or equal to zero.
        } else {
          // We display the usage message.
          helper.usage( request, response, message );
        }
      } else {
        // The number is a floating-point. We display the usage message.
        helper.usage( request, response, message );
      }
    } else {
      // We display a message to inform the user of usage.
      helper.usage( request, response, message );
    }
  } catch( exception ) {
    console.error( "ERROR:", exception.message );
    next( exception );
  }
};

/*
 * This processes a request for many records from the Patient table.
 *
 */
async function many( request, response, next ) {
  // This message will be shown if there is an error.
  const message = "Please specify a query with parameter page=i where i is an integer greater than or equal to zero. A query for page=0 returns all records.";
  // We try to process the request.
  try {
    let parameter = Number.parseInt( request.query.page );
    // We check if the parameter is either a floating-point or an integer.
    if( typeof parameter === 'number' && !( Number.isNaN( parameter ) ) ) {
      // We check if the parameter is an integer.
      if( Number.isInteger( parameter ) ) {
        // The number is an integer greater than zero.
        if( parameter > 0 ) {
          // We get records by page.
          response.json( await patient.getPage( parameter ) );
        // The number is an integer equal to zero.
        } else if ( parameter == 0 ) {
          // We get all records.
          response.json( await patient.get() );
        // The number is a negative integer.
        } else {
          // We display the usage message.
          helper.usage( request, response, message );
        }
      } else {
        // The number is a floating-point. We display the usage message.
        helper.usage( request, response, message );
      }
    } else {
      // We display a message to inform the user of usage.
      helper.usage( request, response, message );
    }
  } catch( exception ) {
    console.error( "ERROR:", exception.message );
    next( exception );
  }
};

/*
 * This processes a request to add one record the Patient table.
 *
 */
async function post( request, response, next ) {
  // This message will be shown if there is an error.
  const message = "We could not add your record.";
  // We try to process the request.
  try {
    // We post a record.
    response.json( await patient.createOne( request.body ) );
  } catch( exception ) {
    console.error( "ERROR:", exception.message );
    next( exception );
  }
};

// We define valid routes.
const router = express.Router();
router.get( '/', many );
router.get( '/:id', one );
router.post( '/', post );

// We export the router.
module.exports = router;