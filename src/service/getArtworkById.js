import { getMetArtWorkById } from '../service/metApi';
import { getSmithArtWorkById } from '../service/smithApi';
import { getChicagoArtWorkById} from '../service/chicagoApi';
import { transformMetApi, transformChicagoApi, transformSmithApi } from '../service/transform';

export async function fetchArtworkById(id, source) {
  if (source === 'met') {
    const raw = await getMetArtWorkById(id);
    return transformMetApi(raw)
  }
  if (source === 'smithsonian') {
    const raw = await getSmithArtWorkById(id);
    return transformSmithApi(raw);
  }
  if (source === 'chicago'){
    const raw = await getChicagoArtWorkById(id);
    return transformChicagoApi(raw);
  }

  throw new Error(`Unsupported source: ${source}`)
}