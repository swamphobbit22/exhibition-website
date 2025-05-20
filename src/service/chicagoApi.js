import axios from 'axios';

const baseUrl = 'https://api.artic.edu/api/v1';

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

export { chicagoApi }
