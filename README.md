# MuseNet Virtual Museum

This project creates a web application that allows users to search for art and artifacts from three different institutions. These are:
- The Metropolitan Museum of Art
- The Art Institute of Chicago
- The Smothsonian

This application is fully responsive across different display sizes: desktop, tablet and mobile. 

- Users do not need an account to browse artworks and artifacts.
- Users can create an account to save favourite artworks and create their own collections
- Buttons( such as add/remove artwork) aare displayed conditionally - depending on whether a user is logged in.

## Overview
Users begin their journey from the home page where there is an 'Explore' button in the center of the screen. Clicking 'Explore' takes the user to the 'Showcase' page. Their is also a navigation bar at the top of the screen displaying the logo and name of the site - these are clickable back to the homepage. There are links for the daily showcase and search pages. There is also a light/dark theme toggle


### Showcase
The 'Daily Showcase' is a curated selection of artworks randomly picked from a daily theme, allowing users to view works that they may have never heard of and would not have thought to look for. The daily theme is accompanied by a short description. 

The showcase is presented in a carousel style and the items presented in card format, with a clickable image, title, artist name, date and short description (if available). Users can click back and forth through the carousel using the forward and back arrow buttons to the sides. 'Daily Showcase' artworks are dynamic and may change throughout the day. Clicking an image takes the user to a description page with more details.

### Search
Users can search artworks and artifacts from the collections and they have the option of returning the results in a grid view (default) or a list view. Each view returns cards containing an small image of the artwork/artifact, the title, artist,and the medium. The cards also display the name of the institute where the item resides and a favourites icon. The number of items returned is displayed under the search box on the left, above the search results.

#### How to search
The 'search' itself is quite forgiving and users can search by artist name, style, artwork type, era/period/date. 

#### Example searches
- searching 'viking' returns items from the Viking era, such as words and other metalwork.
- searching for a date, such as 1800, will return a mixed collection for works around that time frame.
- searching for 'Van Gogh' returns artwork by the artist.

**Searching caveat:**
The data returned from the museum apis may include items that have an indirect relationship with the search term, this is due to way in which the museums store and structure their data (each is different). Searching for a term will return the closest matching results at the top, whilst the results further down the list may not be directly related.
 - For example: searching for 'Van Gogh' will result in several pages of direct results from the Met Museum, the rest of the Met results may contain other impressionists or works relating to Van Gogh but not by him specifically. 
- In cases like this where a large number of items is returned, it can be a good idea to filter by institution, as this will display the more relavent data.

#### Sorting and filtering search results
To the right of the search bar is a filter icon and clicking this will open a form containing two dropdown boxes:

- 'Sort' dropdown 
- 'Filter by repository' dropdown

The 'sort' dropdown enables the user to sort search results by:
- Artist: The artists name in ascending or descending order (note: If there is more than one name, fisrtname lastname, it will sort by firstname).
- Title: The title in asecending or descending order.
- Repository: This sorts the repositories in ascending or descending order.

The 'Filter by Repository' dropdown enables the user to filter search results by a single repository:
- The Metropolitan Museum of Art
- The Art Institute of Chicago
- The Smithsonian

Sorting and filtering options can be cleared by clicking the 'X Clear Sort Options' below the dropdowns. 
Clicking the filer icon again wiill close the sorting form.

#### Clearing search results
Search results can be cleared eother by deleting the search term from the unput box or clicking the 'Clear' button (which only appears during a search) on the righ of the search box.


#### Grid and List View Toggle
To the right hand side, underneath the search button is the grid/list toggle button. Grid view is the default view but the toggle makes it easy to switch between them. 

- In grid view, users can click the item image to click through to a details page.
- In list view, users can click the item image or description box to click through to the details page.

#### Pagination
Search results are returned in a groups of nine and results are paginated. Pagination is at the bottom of the sceeen and pages are in groups of 10 with forward and back buttons.

### Artwork Detail
These pages are not directly accessible from the navigation bar, instead the user clicks through to these via the clickable images returned from the showcase or search results. 

When the users performs a search and returns the items either in a grid or list, they can click on the image (or image and description in list view), and this will open a details page. 

the details page contains a bit more information about the item and includes:
- Title
- Name of artist
- Date
- Culture 
- Classification
- Medium
- Dimensions
- Description

There is also a reference to the institution that the item comes from and this is a link that opens an external web page to the item at that institution. 

This page also contains a larger image of the item and on larger screen sizes the user can hover over the image and make it bigger. On samller devices the user can zoom in and out with a finger pinch (if they have it set up on their device).

Finally, underneath the description the user will find 'share' icons:
- a general share icon for email and other apps.
- X icon to share on X
- Facebook icon to share on Facebook
- LinkedIn icon to share on Linkedin

- there is also a conditional button (add/remove) and a favourites icon that appears when a user is logged in.

### Theme toggle


### Sign-in/ sign-up














## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
