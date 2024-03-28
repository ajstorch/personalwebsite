const API_PATH = "/api";

/* Subclass of Error for representing HTTP errors returned from the API.
   Exposes a status (the HTTP response status code) and message (a user-facing message). */
export class HTTPError extends Error {
  /* status is the HTTP status, message is a user-facing error message. */
  constructor(status, message) {
    /* Call the Error constructor with the given message. */
    super(message);
    this.status = status;
  }
}

/* Make an API request.
   - method is the HTTP method. -- Either a GET, POST, PATCH, DELETE, etc.
   - path is the URL. It must begin with a /. API_URL will be prepended. e.g. /user -- more specific URL than the base
   - body (optional) is the request body as a JS object that can be converted to JSON. -- needed for posting information (but not for getting)

   The API is assumed to return JSON. If the response status is 200, the response body (as a JS object) is returned.
   If the response has any other status, an HTTPError is thrown, with its status set to the response status and its
   message set to value of the "error" property of the response, which we assume is a user-facing error message. */
export const apiRequest = async (method, path, body = null) => {
    let response = await fetch(
        API_PATH + path,
        { 
            method: method, 
            headers: { "Content-Type": "application/json" }, 
            body: body
        }
    )
    let data = await response.json()
    if (response.status === 200){
        return data;
    } else {
        throw new HTTPError(response.status, result.error);
    }
};

/* Create Custom exception */
function Exception(message) {
  const error = new Error(message);

  error.code = "THIS_IS_A_CUSTOM_ERROR_CODE";
  return error;
}

Exception.prototype = Object.create(Error.prototype);

/* This line exposes the apiRequest function in the console, so you can call it for testing. */
window.apiRequest = apiRequest;

export default apiRequest;
