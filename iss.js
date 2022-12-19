const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) {
  const urlAPI = "https://api.ipify.org?format=json";

  request(urlAPI, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ipAddress = JSON.parse(body).ip;
    callback(null, ipAddress);

  });
};


const fetchCoordsByIP = function (ip, callback) {

  const urlAPI = "https://ipwho.is/"+ ip;

  // inside the request callback ...
  // error can be set if invalid domain, user is offline, etc.
  if (error) {
    callback(error, null);
    return;
  }

  // parse the returned body so we can check its information
  const parsedBody = JSON.parse(body);
  // check if "success" is true or not
  if (!parsedBody.success) {
    const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
    callback(Error(message), null);
    return;
  }

  // if we get here, all's well and we got the data
  

  request(urlAPI, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const ipAddress = JSON.parse(body).ip;
    callback(null, ipAddress);
  });
};
module.exports = { fetchMyIP };
