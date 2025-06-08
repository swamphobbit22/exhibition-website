## Technical Documentation

MuseoNet Virtual Museum

The virtual museum is built with React (plain JavaScript), using Vite and a Supabase backend. The app is hosted on Vercel (https://exhibition-website-flax.vercel.app/).

Basic Structure

The app pulls data from three APIs, each with its own structure: The Metropolitan Museum of Art, The Art Institute of Chicago, and the Smithsonian. Each API has its own file and uses Axios to fetch the data. Transform functions handle each API separately, converting the data into a unified format that's easier to work with. The transformed data is then combined. TanStack React Query is used to manage API data in the components.

User data is stored in a Supabase backend, which also handles authentication. The backend includes tables for user profiles and user collections. On the frontend, user data is managed with Zustand. There's one store for user info and another for user collections and user favourites. Zustand handles sign-in, sign-out, and the creation and management of collections and favourited artworks.

Architectural Decisions

APIs: Keeping each API in its own file with a separate transform function keeps the code organised and easier to maintain. New APIs can be added without much hassle. Axios was used for its consistent behaviour, error handling, and straightforward usage.

React Query: Used for handling external API data. It handles caching, background refetching, loading states, and errors out of the box. Caching is useful since users will be navigating back and forth. It also avoids the need to manage lots of state manually.

Zustand: Manages state related to the user and collections. Data is split into separate stores to keep things clear and maintainable.

Considerations

Throughout the project, I’ve focused on:
Keeping concerns separated for easier maintenance and future scaling

Writing clean, readable code

Avoiding unnecessary complexity

