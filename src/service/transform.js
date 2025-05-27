function transformMetApi(data) {
    
    return {
        id: data.objectID,
        title: data.title,
        repository: data.repository,
        imageUrl: data.primaryImageSmall,
        artist: data.artistDisplayName,
        medium: data.medium,
        source: 'met'
    }
}

function transformSmithApi(data) {

    return {
        id: data.id,
        title: data.content?.descriptiveNonRepeating?.title?.content || 'Unknown Title', 
        repository: data.content?.freetext.dataSource?.[0]?.content || 'Smithsonian',
        imageUrl: data.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content,
        artist: data.content?.freetext?.name?.[0]?.content || 'Unknown',
        medium: data.content?.freetext?.physicalDescription?.[0]?.content,
        source: 'smithsonian',
        period: data.content?.freetext?.date?.[0]?.content,
        description: data.content?.freetext?.notes?.[1]?.content
    }
}

function transformSmithDetailApi(data) {
    const artwork = data.response;
    return {
        id: artwork.id,
        title: artwork.title,
        repository: artwork.content?.freetext?.dataSource?.[0]?.content || 'Smithsonian',
        imageUrl: artwork.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content,
        artist: artwork.content?.freetext?.name?.[0]?.content || 'Unknown Artist',
        medium: artwork.content?.freetext?.physicalDescription?.[0]?.content,
        source: 'smithsonian',
        period: artwork.content?.freetext?.date?.[0]?.content,
        description: artwork.content?.freetext?.notes?.[1]?.content
    }
}


function transformChicagoApi(data) {
    let imageId = null;

    if(data.image_id){
        imageId = data.image_id;
    } else if(data.alt_image_ids && data.alt_image_ids.length > 0){
        imageId = data.alt_image_ids[0];
    }

    //need to revisit the sizing as some images are unavailable at 843 and 600
    const imageUrl = imageId
     ? `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`
     : null;

    return {
        id: data.id,
        title: data.title,
        repository: 'Art Institute of Chicago',
        imageUrl: imageUrl,
        artist: data.artist_title,
        medium: data.medium_display,
        source: 'chicago',
        period: data.date_display,
        description: data.description,
    }
}

export { transformMetApi, transformSmithApi, transformSmithDetailApi, transformChicagoApi }