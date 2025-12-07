import axios from 'axios';

const baseUrl = 'https://api.artic.edu/api/v1';
// const imageUrl = 'https://www.artic.edu/iiif/2';

const chicagoApi = async(query) => {
    const response = await axios.get(`${baseUrl}/artworks/search`, {
        params: {
            q: query,
            limit: 100,
            fields: 
            'id,title,artist_title,date_display,medium_display,dimensions,image_id,alt_image_ids,api_link,description',
            
        }
    })

    return response.data.data;
}

//return the image url instead of the binary data - so not axios get
const getApiImageUrl = (image_id, alt_image_ids, width = 843) => {
    let image;

    if(image_id){
        image = image_id;
    } else if(alt_image_ids && alt_image_ids.length > 0){
         image = alt_image_ids[0];
    }else {
        return null;
    }

    //use serverless function
    // return `/api/artic-image?imageId=${image}`;
    // return `/api/proxy/chicago?imageId=${image}`;
    return `/api/proxy/chicago?imageId=${image}&size=full/${width},`;
    
    // return `${imageUrl}/${image}/full/843,/0/default.jpg`;
    // const originalUrl = `${imageUrl}/${image}/full/843,/0/default.jpg`;

    // return `https://corsproxy.io/?${encodeURIComponent(originalUrl)}`;

}

const getChicagoArtWorkById = async (id) => {
    try {
     const response = await axios.get(`${baseUrl}/artworks/${id}`);
     return response.data.data;       
    } catch (error) {
      console.warn(`Failed to fetch artwork ${id}:`, error.message);
    return null;
    }
}

export { chicagoApi, getApiImageUrl, getChicagoArtWorkById };
