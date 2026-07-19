CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"title" text NOT NULL,
	"slug" text NOT NULL UNIQUE,
	"excerpt" text,
	"featured_image" text,
	"category" text NOT NULL,
	"author" text NOT NULL,
	"read_time" integer DEFAULT 5,
	"featured" boolean DEFAULT false,
	"published_at" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone
);
--> statement-breakpoint
CREATE UNIQUE INDEX "blog_slug_idx" ON "blogs" ("slug");--> statement-breakpoint
CREATE INDEX "blog_category_idx" ON "blogs" ("category");--> statement-breakpoint
CREATE INDEX "blog_author_idx" ON "blogs" ("author");--> statement-breakpoint
CREATE INDEX "blog_published_idx" ON "blogs" ("published_at");