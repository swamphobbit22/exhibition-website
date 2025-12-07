import { stripHtmlTags } from "../utils/stripHtml";
import { getApiImageUrl } from "./chicagoApi";

function transformMetApi(data) {
    
    return {
        id: data.objectID.toString(),
        title: stripHtmlTags(data.title),
        repository: data.repository,
        imageUrl: data.primaryImageSmall,
        artist: data.artistDisplayName,
        medium: data.medium,
        source: 'met',
        period: data.objectDate,
        description: stripHtmlTags(data.elementDescription),
        culture: data.culture,
        classification: data.classification,
        dimensions: data.dimensions,
        resourceUrl: data.objectURL,
    }
}

function transformSmithApi(data) {

    return {
        id: data.id.toString(),
        title: stripHtmlTags(data.content?.descriptiveNonRepeating?.title?.content) || 'Unknown Title', 
        repository: data.content?.freetext.dataSource?.[0]?.content || 'Smithsonian',
        imageUrl: data.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content,
        artist: data.content?.freetext?.name?.[0]?.content || 'Unknown',
        medium: data.content?.freetext?.physicalDescription?.[0]?.content,
        source: 'smithsonian',
        period: data.content?.freetext?.date?.[0]?.content || null,
        description: stripHtmlTags(data.content?.freetext?.notes?.[1]?.content),
        culture: data.content?.freetext?.culture?.content || 'Culture unknown',
        classification: data.content?.freetext?.objectType?.content || 'Classification unknown',
        dimensions: data.content?.freetext?.physicalDescription?.content || 'Dimensions unknown',
        resourceUrl: data.content?.descriptiveNonRepeating?.record_link || 'URL not available',
    }
}

function transformSmithDetailApi(data) {
    const artwork = data.response;
    return {
        id: artwork.id.toString(),
        title: stripHtmlTags(artwork.title),
        repository: artwork.content?.freetext?.dataSource?.[0]?.content || 'Smithsonian',
        imageUrl: artwork.content?.descriptiveNonRepeating?.online_media?.media?.[0]?.content,
        artist: artwork.content?.freetext?.name?.[0]?.content || 'Unknown Artist',
        medium: artwork.content?.freetext?.physicalDescription?.[0]?.content,
        source: 'smithsonian',
        period: artwork.content?.freetext?.date?.[0]?.content || null,
        description: stripHtmlTags(artwork.content?.freetext?.notes?.[1]?.content),
        culture: artwork.content?.freetext?.culture?.content || 'culture unknown',
        classification: artwork.content?.freetext?.objectType?.content || 'Classification unknown',
        dimensions: artwork.content?.freetext?.physicalDescription?.content || 'Dimensions unknown',
        resourceUrl: artwork.content?.descriptiveNonRepeating?.record_link || 'URL not available',
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
    ? `/api/proxy/chicago?imageId=${imageId}&size=full/400,`
    //  ? `https://www.artic.edu/iiif/2/${imageId}/full/400,/0/default.jpg`
     : null;

    const resourceUrl = `https://www.artic.edu/artworks/${data.id}`

    return {
        id: data.id.toString(),
        title: stripHtmlTags(data.title),
        repository: 'Art Institute of Chicago',
        imageUrl: imageUrl, //should come from proxy/chicago.js
        artist: data.artist_title,
        medium: data.medium_display,
        source: 'chicago',
        period: data.date_display,
        description: stripHtmlTags(data.description),
        culture: data.culture,
        classification: data.classification_title,
        dimensions: data.dimensions,
        resourceUrl: resourceUrl,
    }
}

export { transformMetApi, transformSmithApi, transformSmithDetailApi, transformChicagoApi }