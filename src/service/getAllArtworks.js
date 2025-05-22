import { metApi, getArtWorks as getMetArtworks } from '../service/metApi';
import { smithApi } from '../service/smithApi';
import { chicagoApi} from '../service/chicagoApi';
import { transformMetApi, transformChicagoApi, transformSmithApi } from '../service/transform';

export async function fetchCombinedArtworks(searchTerm){
      //abstracted out from browse.js
      // combined search as default - filtered search can come later
      const [metResult, smithResult, chicagoResult] = await Promise.allSettled([
        metApi(searchTerm),
        smithApi(searchTerm),
        chicagoApi(searchTerm)
      ])

      const metSearch = metResult.status === 'fulfilled' ? metResult.value : { objectIDs: [] };
      const smithSearch = smithResult.status === 'fulfilled' ? smithResult.value : [];
      const chicagoSearch = chicagoResult.status === 'fulfilled' ? chicagoResult.value : [];

      const metIds = metSearch?.objectIDs || [];
      const [metRaw] = await Promise.all([
        getMetArtworks(metIds),
      ]);

      const smithRaw = smithSearch;

      // use transformdata and combine the results
      const smithResults = smithRaw.map(transformSmithApi)
      const metResults = metRaw.map(transformMetApi)
      const chicagoResults = chicagoSearch.map(transformChicagoApi);

      return [...metResults, ...smithResults, ...chicagoResults];

}