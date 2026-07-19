ALTER TABLE "blogs" ALTER COLUMN "read_time" SET DATA TYPE text USING "read_time"::text;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "read_time" DROP DEFAULT;