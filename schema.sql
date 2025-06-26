

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."collection_artwork" (
    "id" integer NOT NULL,
    "collection_id" integer,
    "object_id" "text" NOT NULL,
    "object_title" character varying(200),
    "source_url" "text",
    "thumbnail_url" "text",
    "added_at" timestamp with time zone DEFAULT "now"(),
    "notes" "text",
    "source" "text"
);


ALTER TABLE "public"."collection_artwork" OWNER TO "postgres";


COMMENT ON COLUMN "public"."collection_artwork"."source" IS 'the repository';


CREATE SEQUENCE IF NOT EXISTS "public"."collection_artwork_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."collection_artwork_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."collection_artwork_id_seq" OWNED BY "public"."collection_artwork"."id";



CREATE TABLE IF NOT EXISTS "public"."collections" (
    "id" integer NOT NULL,
    "user_id" "uuid",
    "name" character varying(150) NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."collections" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."collections_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."collections_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."collections_id_seq" OWNED BY "public"."collections"."id";



CREATE TABLE IF NOT EXISTS "public"."favourites" (
    "id" integer NOT NULL,
    "user_id" "uuid",
    "object_id" "text" NOT NULL,
    "source" "text",
    "added_at" timestamp with time zone DEFAULT "now"(),
    "title" "text",
    "image_url" "text"
);


ALTER TABLE "public"."favourites" OWNER TO "postgres";



CREATE SEQUENCE IF NOT EXISTS "public"."favourites_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."favourites_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."favourites_id_seq" OWNED BY "public"."favourites"."id";



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "deleted_at" timestamp with time zone
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


ALTER TABLE ONLY "public"."collection_artwork" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."collection_artwork_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."collections" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."collections_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."favourites" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."favourites_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."collection_artwork"
    ADD CONSTRAINT "collection_artwork_collection_id_object_id_key" UNIQUE ("collection_id", "object_id");



ALTER TABLE ONLY "public"."collection_artwork"
    ADD CONSTRAINT "collection_artwork_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."collections"
    ADD CONSTRAINT "collections_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."favourites"
    ADD CONSTRAINT "favourites_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



CREATE UNIQUE INDEX "unique_user_artwork" ON "public"."favourites" USING "btree" ("user_id", "object_id");



ALTER TABLE ONLY "public"."collection_artwork"
    ADD CONSTRAINT "collection_artwork_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "public"."collections"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."collections"
    ADD CONSTRAINT "collections_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."favourites"
    ADD CONSTRAINT "favourites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id");



CREATE POLICY "Users can access their own collections" ON "public"."collections" USING (("user_id" = "auth"."uid"())) WITH CHECK (("user_id" = "auth"."uid"()));



CREATE POLICY "Users can insert their own profile" ON "public"."profiles" FOR INSERT WITH CHECK (("auth"."uid"() = "id"));



CREATE POLICY "Users can manage artworks in their collections" ON "public"."collection_artwork" USING (("collection_id" IN ( SELECT "collections"."id"
   FROM "public"."collections"
  WHERE ("collections"."user_id" = "auth"."uid"())))) WITH CHECK (("collection_id" IN ( SELECT "collections"."id"
   FROM "public"."collections"
  WHERE ("collections"."user_id" = "auth"."uid"()))));



CREATE POLICY "Users can manage their own favorites" ON "public"."favourites" USING (("auth"."uid"() = "user_id"));



CREATE POLICY "Users can read their own profile" ON "public"."profiles" FOR SELECT USING (("auth"."uid"() = "id"));



CREATE POLICY "Users can update their own profile" ON "public"."profiles" FOR UPDATE USING (("auth"."uid"() = "id"));



ALTER TABLE "public"."collection_artwork" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."collections" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."favourites" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";


























































































































































































GRANT ALL ON TABLE "public"."collection_artwork" TO "anon";
GRANT ALL ON TABLE "public"."collection_artwork" TO "authenticated";
GRANT ALL ON TABLE "public"."collection_artwork" TO "service_role";


GRANT ALL ON SEQUENCE "public"."collection_artwork_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."collection_artwork_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."collection_artwork_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."collections" TO "anon";
GRANT ALL ON TABLE "public"."collections" TO "authenticated";
GRANT ALL ON TABLE "public"."collections" TO "service_role";



GRANT ALL ON SEQUENCE "public"."collections_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."collections_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."collections_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."favourites" TO "anon";
GRANT ALL ON TABLE "public"."favourites" TO "authenticated";
GRANT ALL ON TABLE "public"."favourites" TO "service_role";


GRANT ALL ON SEQUENCE "public"."favourites_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."favourites_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."favourites_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
