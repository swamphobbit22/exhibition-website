# API Documentation

## MuseoNet Virtual Museum

**Overview**

Artwork data comes from three different apis - these are:
- The Metropolitan Museum
- The Institute of Art Chicago
- The Smithsonian Institute

Each of these has its own structure and quirks:
- The Met API has a lot of issues with invalid object id's - the problem is in their data. 
- The Met now seem to be blocking certain IP ranges, resulting in blank pages - I created a serverless function to get around this, which seems to be working quite well.
- The Smithsonian API is very deeply nested and trying to extract the correct information is a minefield. If you intend to clone the project and add more details from this particular API, I would suggest using Postman to test out the endpoints. 
- Object ids for the Smithsonian are a mix of letters and numbers, so the columns for object_id in the database is a text field. 


## API Integration

1. Axios is used to fetch the data from the apis. Each api has its own file.
2. Because each api has a different structure, the data needed to be transformed into a useable structure, a transform file was created with transform functions for each api. 
3. The transformed data is then combined in two files ( geArtworkById and getAllArtwork), making it easier to work with the apis throughout the app. 

### Here is an example of transformed data into one structure:
As you can see each api has a different structure for the artists name, so on the left we have unified it into 'artist'. Then we can simply refer to the artist name throughout the app as 'artist'. This process has been followed for all the fields that are currently used. 

**Met:**

`artist: data.artistDisplayName`

**Chicago:**

`artist: data.artist_title`

**Smithsonian**:

`artist: data.content?.freetext?.name?.[0]?.content || 'Unknown'`

## Other Information:
#### The Met API:
- This Api does NOT require an API key

#### The Chicago Institute and The Smithsonian:
- These APIs require an API key from the US Government website, which you can request here:
https://api.data.gov/signup/
- The Chicago Institute uses two APIs: 
- https://www.artic.edu/iiif/ and https://www.artic.edu/artworks/ - The main API does not contain images so you must take the id and retrieve the image from the iiif API. Inside the app, this is done in the chicago api file.
- first you will pull the data from:
`const baseUrl = 'https://api.artic.edu/api/v1';`
- and then with the retrieved image id you pull from:
`const imageUrl = 'https://www.artic.edu/iiif/2'; `, You can see how this is used and the url built up in the Chicago API fie.


### External API Documentation Links

- Chicago Institute: https://api.artic.edu/docs/#introduction
- The Smithsonian: https://www.si.edu/openaccess/devtools and https://edan.si.edu/openaccess/apidocs/
- Met Open Access: https://www.metmuseum.org/about-the-met/policies-and-documents/open-access

#### Useful:
- https://www.postman.com/opamcurators/open-access-museums/overview
- https://api.data.gov/signup/

### Further API Integrations
More APIs can easily be added - just create a separate api file to fetch the data and then add the structure in the transform.js file and make the necessary additions to getAllArtworks and getArtworksById, and that's it, you will be able to use the new api easily in the app using the same structure as the other apis, (also add the necessary environment variables to .env, if there is an api key).

More fields can be added to the existing transform functions if required - but you will need to create the new field for **EACH** api transform function

### Serverless function
This was created to resolve connection issues with the Met API. A new folder and file have been created in the root of the project (api/met.js). This is just for the met API. vercel hosts the /api/met route and this routes all requests to the Met from Vercel, rather than the user's device. This should make the connection to the Met more reliable and no more blocking.  