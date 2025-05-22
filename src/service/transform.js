function transformMetApi(data) {
    return {
        id: data.objectID,
        title: data.title,
        repository: data.repository,
        imageUrl: data.primaryImageSmall,
        artist: data.artistDisplayName,
        medium: data.medium,
    }
}

function transformSmithApi(data) {
    return {
        id: data.id,
        title: data.content?.descriptiveNonRepeating?.title?.[0]?.title_sort,
        repository: data.content?.freetext.dataSource?.[0]?.content,
        imageUrl: data.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content,
        artist: data.content?.freetext?.name?.[0]?.content,
        medium: data.content?.freetext?.physicalDescription?.[0]?.content,
    }
}

function transformChicagoApi(data) {
    //need to revisit the sizing as some images are unavailable at 843 and 600
    const imageUrl = data.image_id
     ? `https://www.artic.edu/iiif/2/${data.image_id}/full/400,/0/default.jpg`
     : null;

    return {
        id: data.id,
        title: data.title,
        repository: 'Art Institute of Chicago',
        imageUrl: imageUrl,
        artist: data.artist_title,
        medium: data.medium_display,
    }
}

export { transformMetApi, transformSmithApi, transformChicagoApi }