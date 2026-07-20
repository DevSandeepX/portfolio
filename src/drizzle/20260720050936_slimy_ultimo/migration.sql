CREATE TYPE "blog_statuses" AS ENUM('draft', 'scheduled', 'published', 'archived');--> statement-breakpoint
ALTER TABLE "blogs" RENAME COLUMN "category" TO "category_id";--> statement-breakpoint
ALTER TABLE "blogs" RENAME COLUMN "author" TO "author_id";--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "blog_status" "blog_statuses" DEFAULT 'draft'::"blog_statuses" NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "content" json NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "tags" text[] DEFAULT '{}'::text[];--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "keywords" text[];--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "seo_title" text;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "seo_description" text;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "seo_keywords" text[];--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "canonical_url" text;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "allow_comments" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "deleted_at" timestamp with time zone;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "category_id" SET DATA TYPE uuid USING "category_id"::uuid;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "read_time" SET DATA TYPE integer USING "read_time"::integer;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "published_at" SET DATA TYPE timestamp with time zone USING "published_at"::timestamp with time zone;