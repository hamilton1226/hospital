/**
 * Creates an oauth signature for the specified url
 * @param the url
 * @param requestOptions object containing the following parameters:
 * -- consumerKey OAUTH consumer key.
 * -- consumerSecret OAUTH consumer secret.
 * -- requestParams request parameters. 
 * -- token OAUTH token.
 * -- tokenSecret OAUTH token secret.
 * -- type of request (eg POST, GET, etc)
 */
export default function(requestUrl, requestOptions) {
    var signature_url = requestUrl.replace('/db/', 'http://localhost:5984/'),
        params = requestOptions.requestParams || {};            
    params.oauth_consumer_key = requestOptions.consumerKey;
    params.oauth_token = requestOptions.token;
    params.oauth_signature_method = 'HMAC-SHA1';
    params.oauth_version = '1.0';            
    params.oauth_signature = oauthSignature.generate(
        requestOptions.type, signature_url, params, 
        requestOptions.consumerSecret, requestOptions.tokenSecret);
    return params;

}