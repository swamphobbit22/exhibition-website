# Backend Documentation

## MuseoNet Virtual Museum Database

**Overview**

The backend for this project was created in Supabase, which also handles user authentication. 
It comprises of the following tables:
- auth.users (in-built Supabase table)
- profiles
- favourites 
- collections
- collection_artwork

**Artwork images are not stored in the db, just the url, images are retrieved from the apis. There are no storage buckets in this project - however, if you want to store users artwork in the db, or you would like users to have an avatar, you will need to set up storage buckets for these.**

## Database Structure

### profiles table:
The profiles table only contains two columns (id and deleted_at) and was created for account deletion purposes. This provides a soft delete. To remove the users account completely a separate Node.js script was created and uploaded to vercel separately. It is not currently running for this project but will be implemented soon. Further instructions and a link will follow. The script will run daily and delete users 7 days after the 'deleted_at' date. **Please check back for further details**.
You could add extra columns in the profiles table for an avatar and username etc, if you wish. 

**Columns:**
- id (uuid) (PK, related to auth.users.id)
- deleted_at (timstamptz)

### favourites table:
This table stores the users favourited artworks.

**Columns:**
- id (int) (PK)
- user_id (uuid) (FK to auth.users.id)
- object_id (text)
- source (text)
- added_at (timestamptz)
- title (text)
- image_url (text)


### collections table:

The collections table stores the user's created collections - these are the containers for their selected artwork.

**Columns:**
- id (int) (PK)
- user_id (uuid) (FK to auth.users.id)
- name (varchar)
- created_at (timestamptz)

### collection_artwork:
The collections_artwork table contains the user's selected artworks and these are related to the collections table by the foreign key - collection_id.

**Columns:**
- id (int) (PK)
- collection_id (int) (FK to collections.id)
- object_id (text)
- object_title (varchar)
- source_url (text)
- thumbnail_url (text)
- added_at (timestamptz)
- notes (text)
- source (text)

There are two, as yet, unused columns in collection_artwork (**source_url and notes**). The source_url column may not be needed at all and the notes column was intended for a user to add notes to their artwork, but I did not impliment this (potentially in the future). You can keep or remove these columns if you want, it will not affect anything else. 

## RLS Policies
**Overview:**
Users can add and remove favourited items. They can create and delete collections and they can add and remove artworks from their collections.

- collection_artwork: Users can manage artworks in their collections
- collections: Users can access their own collections
- favourites: Users can manage their own favorites

Profiles table: There are 3 policies on here ready for further user profile functionality (avatars etc).
- Users can insert their own profile
- Users can read their own profile
- Users can update their own profile

## Environment Setup:

You will need the connection string and anon key when you create your database and you will need to store these securely in a .env file (making sure they are ignored in your .gitignore file). When you deploy the app you will probably need to also add the environment variables to which host you are deplying it to. 

## Authentication
Supabase manages user authentication in the auth.users table - this is an automatic table crated by Supabase. At present only email/password authentication is enabled but you could also enable OAUTH if you wish (and there are other options available) - You will need to enable this in the database settings and also in the Google Console. Password reset by email is also enabled. 


## Schema
**To recreate the entire database, including policies etc, there is a schema file (scheme.sql).**

**What's NOT in the schema (You will need to set this up yourself):**

- Email/password authentication settings
- Email templates (reset password, confirmation, etc.)
- OAuth providers (Google, GitHub, etc.)
- SMTP settings for email delivery
- Auth redirect URLs
- Email confirmation requirements
- Password requirements/policies

**What IS in the schema:**

- Your custom tables (collections, favourites, profiles)
- RLS policies for your tables
- Foreign key relationships to auth.users




## Create a new backend
Part 1:
1. Create a new Supabase project
2. Go to the SQL editor
3. Run the contents of schema.sql
4. Database is ready, job done!

Part 2:
1. You will need to add the connection url and the anon key to your .env file

#### Other backend services: This app uses external APIs and these are covered in the API documentation.

