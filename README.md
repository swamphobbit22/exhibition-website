# MuseoNet Virtual Museum

This project creates a web application that allows users to search for art and artifacts from three different institutions. These are:
- The Metropolitan Museum of Art
- The Art Institute of Chicago
- The Smithsonian

This application is fully responsive across different display sizes: desktop, tablet and mobile. 

- Users do not need an account to browse artworks and artifacts.
- Users can create an account to save favourite artworks and create their own collections
- Buttons( such as add/remove artwork) are displayed conditionally - depending on whether a user is logged in.

**Important**
If there are any issues returning search results this can usually be resolved by refreshing the page or, where a user is logged in, simply logging out and in again.  

## Overview
Users begin their journey from the home page where there is an 'Explore' button in the center of the screen. Clicking 'Explore' takes the user to the 'Showcase' page. There is also a navigation bar at the top of the screen displaying the logo and name of the site - these are clickable back to the homepage. There are links for the daily showcase and search pages. There is also a light/dark theme toggle


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
- In cases like this where a large number of items is returned, it can be a good idea to filter by institution, as this will display the more relevent data.

#### Sorting and filtering search results
To the right of the search bar is a filter icon and clicking this will open a form containing two dropdown boxes:

- 'Sort' dropdown 
- 'Filter by repository' dropdown

The 'sort' dropdown enables the user to sort search results by:
- Artist: The artists name in ascending or descending order (note: If there is more than one name, firstname lastname, it will sort by firstname).
- Title: The title in ascending or descending order.
- Repository: This sorts the repositories in ascending or descending order.

The 'Filter by Repository' dropdown enables the user to filter search results by a single repository:
- The Metropolitan Museum of Art
- The Art Institute of Chicago
- The Smithsonian

Sorting and filtering options can be cleared by clicking the 'X Clear Sort Options' below the dropdowns. 
Clicking the filter icon again will close the sorting form.

#### Clearing search results
Search results can be cleared either by deleting the search term from the input box or clicking the 'Clear' button (which only appears during a search) on the right of the search box.


#### Grid and List View Toggle
To the right hand side, underneath the search button is the grid/list toggle button. Grid view is the default view but the toggle makes it easy to switch between them. 

- In grid view, users can click the item image to click through to a details page.
- In list view, users can click the item image or description box to click through to the details page.

#### Pagination
Search results are returned in a groups of nine and results are paginated. Pagination is at the bottom of the screen and pages are in groups of 10 with forward and back buttons.

### Artwork Detail
These pages are not directly accessible from the navigation bar, instead the user clicks through to these via the clickable images returned from the showcase or search results. 

When the users performs a search and returns the items either in a grid or list, they can click on the image (or image and description in list view), and this will open a details page. 

The details page contains more information about the item and includes:
- Title
- Name of artist
- Date
- Culture 
- Classification
- Medium
- Dimensions
- Description

There is also a reference to the institution that the item comes from and this is a link that opens an external web page to the item at that institution. 

This page also contains a larger image of the item and on larger screen sizes the user can hover over the image and make it bigger. On smaller devices the user can zoom in and out with a finger pinch (if they have it set up on their device).

Finally, underneath the description the user will find 'share' icons:
- a general share icon for email and other apps.
- X icon to share on X
- Facebook icon to share on Facebook
- LinkedIn icon to share on LinkedIn

- there is also a conditional button (add/remove) and a favourites icon that appears when a user is logged in.

- At the top of the 'details' page is a 'back' button - the name of this changes depending on the route the user takes to the details page. For example, if the user has come from the 'Showcase' page, then the back button will reflect this and say 'back to showcase'. So it will take the user back to whichever page they came from. 

### Theme toggle
The theme toggle is situated along the navigation bar on larger devices and on smaller devices it appears in the expandable mobile menu. 
The theme toggle switches between light and dark modes.
The website will adopt the users preferred mode if they have one set on their device already.

### Sign-in/ sign-up / Password reset
This is situated along the navigation bar on the right on larger devices and in the expandable mobile menu on smaller devices. A sign up/in modal will pop up. Users can switch between them. 
If in sign up mode there will be a link underneath to create an account and this will switch to the Sign-up option. 

- When creating an account the user will receive an email confirmation and they will need to confirm the email before they can log in.

#### Password reset: 
- Also at the bottom of the sign-in modal is a password reset option. Clicking this will expand the modal to display the password reset options. An email will be sent to the user with a password reset link.

## Logged In Users
When a user logs in they will be able to add items to favourites, create their own collections and add artworks to their collections. They can also remove any of these individually or completely. 

### Favourites
User can add any item to their favourites. Items that have not been favourited appear grey and items that have been favourited are red. Users can favourite items returned in the search on the search page or when they click through to the details page.
- Items can be favourited or unfavourited by simply clicking the heart icon.

### Collections
Users can add any item to a collection. When a user is logged in the 'add' or 'remove' from favourites button will appear on each item that has been returned from the search or when the user clicks through to the details page. 

- to add an item to a collection the user will first need to create a collection.

#### Create a collection and add artwork
A collection can be created by two methods - from the user dashboard or a button on the search results themselves:
- The user can go to their dashboard from the dropdown menu and then click 'View Create Collection'. This will display the create collection input and button. Simply type a name for your collection and press create collection. If successful a popup message should appear at the top right. You can hide the create New Collection box by clicking the 'Hide Create Collection' button. 

- Once a collection has been created, the user can then search for artworks or go to a details page (from search or showcase) and then simply add the artwork to the new collection.

- Clicking 'Add to Collection' opens the 'Add Selected Artworks to Collection' modal. Choose a collection from the dropdown and click 'Add to Collection'.

- The second method to create a collection is also available in this modal. Click the 'Create Collection' button, enter a name in the input, and click 'Create Collection'. The new collection will immediately appear in the first dropdown, so you can select it and add the artwork right away.

- After an artwork is added, the modal will close and the artwork on the page will update with a red 'Remove from Collection' button. This update may be instant or take a moment, depending on your network. If it doesn't update straight away, navigating away and back will reflect the change.

- To cancel the modal, click the 'X' in the top right corner.

Artworks can be removed individually by clicking the red 'Remove from Collection' button. This will remove the artwork immediately, and the button will return to green. 

## User Dashboard
The user dashboard displays four buttons:
- View collections
- View Create Collection
- View Favourites
- Delete Account

**View Collections**: 

By clicking 'View Collections' the user can view all of their saved collections. Each is shown in card form with the name of the collection, date created and a red 'delete' button. A collection can only be deleted if it is empty. If there are artworks inside the collection the user will need to remove each artwork and then delete the collection.

The user can click into the collection to view their saved artworks and each artwork can be clicked to open the details page.

The collections can be closed by clicking the 'Hide Collections' button - or it can remain open while you click the other buttons! 

**View Create Collection**

This opens the Create collection box (as already discussed). To hide it again, click 'Hide Create Collection' button.

**View Favourites**

This button displays your favourited items and includes, image, title, the source, and the date added to favourites. Clicking an image will open the details page for that image and you can navigate back to favourites from there. 

At the top of your favourited items there is a button 'Clear all Favourites'. This will completely empty the favourites folder and cannot be undone. To remove an individual favourite, click on the image and unfavourite it in the details page. Go to the top to navigate back.

To hide the favourites in the dashboard, click the 'Hide favourites' button.

**Delete Account**
This will delete the users account and cannot be undone.

## Further Information
- Data is returned from external museum apis and may not always be available, as such, this website is not responsible for issues with 3rd party data.  
- search speed can depend on your network and/or the availability of the 3rd party api.
- User updates, such as adding artwork to collections also depends on your network speed/availability.


## MuseoNet Virtual Museum
The live website can be found here:

 https://exhibition-website-flax.vercel.app/







