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

      // transformdata and filter out any null values
      const smithResults = smithRaw.map(item => {
        try {
            return transformSmithApi(item)
        } catch (error) {
            console.warn('Failed to transform Smithsonian item:', error);
            return null;
        }
      }).filter(Boolean);

      const metResults = metRaw.map(item => {
        try {
            return transformMetApi(item)
        } catch (error) {
            console.warn('Failed to transform Met item:', error);
            return null;
        }
      }).filter(Boolean);

      const chicagoResults = chicagoSearch.map(item => {
        try {
            return transformChicagoApi(item)
        } catch (error) {
            console.warn('Failed to transform Chicago Art Institute item:', error);
            return null;
        }
      }).filter(Boolean);

      return [...metResults, ...smithResults, ...chicagoResults];

}
