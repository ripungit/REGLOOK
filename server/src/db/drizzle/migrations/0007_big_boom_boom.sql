CREATE TABLE IF NOT EXISTS "cocktail_transfers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"device_id" uuid NOT NULL,
	"type" varchar(20) NOT NULL,
	"path" text NOT NULL,
	"size_bytes" integer,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"error" text,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cocktail_fs_cache" (
	"device_id" uuid NOT NULL,
	"path" text NOT NULL,
	"items" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cocktail_fs_cache_pk" UNIQUE("device_id","path")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cocktail_processes_latest" (
	"device_id" uuid PRIMARY KEY NOT NULL,
	"items" jsonb NOT NULL,
	"captured_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cocktail_uploads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"device_id" uuid NOT NULL,
	"vps_id" uuid NOT NULL,
	"object_key" text NOT NULL,
	"filename" text NOT NULL,
	"size_bytes" integer NOT NULL,
	"mime_type" text,
	"dest_path" text NOT NULL,
	"status" varchar(20) DEFAULT 'INIT' NOT NULL,
	"sha256" text,
	"task_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_transfers" ADD CONSTRAINT "cocktail_transfers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_transfers" ADD CONSTRAINT "cocktail_transfers_device_id_cocktail_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."cocktail_devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_fs_cache" ADD CONSTRAINT "cocktail_fs_cache_device_id_cocktail_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."cocktail_devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_processes_latest" ADD CONSTRAINT "cocktail_processes_latest_device_id_cocktail_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."cocktail_devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_uploads" ADD CONSTRAINT "cocktail_uploads_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_uploads" ADD CONSTRAINT "cocktail_uploads_device_id_cocktail_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."cocktail_devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_uploads" ADD CONSTRAINT "cocktail_uploads_vps_id_cockpit_vps_id_fk" FOREIGN KEY ("vps_id") REFERENCES "public"."cockpit_vps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_transfers_device_id_status_idx" ON "cocktail_transfers" USING btree ("device_id","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_transfers_user_id_idx" ON "cocktail_transfers" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_fs_cache_device_path_idx" ON "cocktail_fs_cache" USING btree ("device_id","path");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_uploads_user_id_idx" ON "cocktail_uploads" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_uploads_vps_id_idx" ON "cocktail_uploads" USING btree ("vps_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_uploads_status_idx" ON "cocktail_uploads" USING btree ("status");