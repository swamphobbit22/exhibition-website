import axios from 'axios';

const baseUrl = 'https://api.artic.edu/api/v1';
const imageUrl = 'https://www.artic.edu/iiif/2';

const chicagoApi = async(query) => {
    const response = await axios.get(`${baseUrl}/artworks/search`, {
        params: {
            q: query,
            fields: 
            'id,title,artist_title,date_display,medium_display,dimensions,image_id,api_link',
            limit: 10
        }
    })

    return response.data.data;
}

//return the image url instead of the binary data - so not axios get
const getApiImageUrl = (image_id) => {
    if(!image_id) return null;
    return `${imageUrl}/${image_id}/full/843,/0/default.jpg`;
}

export { chicagoApi, getApiImageUrl }
