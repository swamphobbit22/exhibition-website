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
        // title: data.title,
        title: data.content?.descriptiveNonRepeating?.title?.content, //this is correct
        // title: data.content?.descriptiveNonRepeating?.title?.[0]?.title_sort,
        repository: data.content?.freetext.dataSource?.[0]?.content,
        imageUrl: data.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content,
        artist: data.content?.freetext?.name?.[0]?.content,
        medium: data.content?.freetext?.physicalDescription?.[0]?.content,
        source: 'smithsonian'
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
        source: 'chicago'
    }
}

export { transformMetApi, transformSmithApi, transformChicagoApi }