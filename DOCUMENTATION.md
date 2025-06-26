# Technical Documentation

## MuseoNet Virtual Museum

**Overview**

The virtual museum is built with React (plain JavaScript), using Vite and a Supabase backend. The app is hosted on Vercel (https://exhibition-website-flax.vercel.app/).

**Basic Structure**

The app pulls data from three APIs, each with its own structure: The Metropolitan Museum of Art, The Art Institute of Chicago, and the Smithsonian. Each API has its own file and uses Axios to fetch the data. Transform functions handle each API separately, converting the data into a unified format that's easier to work with. The transformed data is then combined. TanStack React Query is used to manage API data in the components.

User data is stored in a Supabase backend, which also handles authentication. The backend includes tables for user profiles and user collections. On the frontend, user data is managed with Zustand. There is one store for user info and another for user collections and user favourites. Zustand handles sign-in, sign-out, and the creation and management of collections and favourited artworks.

**Architectural Decisions**

APIs: 

Keeping each API in its own file with a separate transform function keeps the code organised and easier to maintain. New APIs can be added without much hassle. Axios was used for its consistent behaviour, error handling, and straightforward usage.

React Query: 

Used for handling external API data. It handles caching, background refetching, loading states, and errors out of the box. Caching is useful since users will be navigating back and forth. It also avoids the need to manage lots of state manually.

Zustand: 

Zustand manages state related to the user and collections. Data is split into separate stores to keep things clear and maintainable.

**Users:**

Users can set up an account and create their own collections as well as favourite items and share artworks. They can also delete their own account - this is permanent. Account deletion is a soft-delete for now, on the backend. A node.js script could be set up to run in vercel to make sure soft-deleted accounts are fully deleted periodically in Supabase.

**Considerations**

Throughout the project, I’ve focused on:
- Keeping concerns separated for easier maintenance and future scaling
- reusability

- Writing clean, readable code

- Avoiding unnecessary complexity

## Project Updates
- June 2025: An issue occured with the Met API on the API end - after some investigation I concluded that the Met are blocking some IP ranges. To get around this I created a serveless function in the project root (api/met.js). This overcomes the blocking issues. The other two apis are unaffected and have not been changed in the code. 

### To run this project
Fork and clone the repo and run npm install. The project previously ran in localhost with **'npm run dev'**, but becuase a serverless function has been added you will now need to install the Vercel CLI (**npm install -g vercel**). In your code editor, open up two terminals. In one terminal type **'vercel dev'** (*in the project root!*) and in the other terminal type **'npm run dev'**. You will need both of these running to interact with the project locally. You will open the browseer from the **'npm run dev'** command.

#### Important!
If you would like to recreate this project you will need a backend. Please see BACKEND-DOCUMENTATION.md for details on how to set up the backend. 