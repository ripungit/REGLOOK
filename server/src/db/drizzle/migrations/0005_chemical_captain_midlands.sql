CREATE TABLE IF NOT EXISTS "cocktail_device_secrets" (
	"device_id" uuid PRIMARY KEY NOT NULL,
	"secret_hash" text NOT NULL,
	"secret_created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"secret_last_used_at" timestamp with time zone,
	"rotated_at" timestamp with time zone,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cocktail_devices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"vps_id" uuid NOT NULL,
	"name" text NOT NULL,
	"status" varchar(50) DEFAULT 'enrolling' NOT NULL,
	"last_seen_at" timestamp with time zone,
	"enrolled_at" timestamp with time zone,
	"disabled_at" timestamp with time zone,
	"agent_version" text,
	"os" text,
	"arch" text,
	"hostname" text,
	"last_ip" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cocktail_devices_vps_id_unique" UNIQUE("vps_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cocktail_enrollment_tokens" (
	"token_hash" text PRIMARY KEY NOT NULL,
	"device_id" uuid NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cocktail_metrics_latest" (
	"device_id" uuid PRIMARY KEY NOT NULL,
	"metrics" jsonb NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cocktail_tasks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"device_id" uuid NOT NULL,
	"type" text NOT NULL,
	"payload" jsonb NOT NULL,
	"status" varchar(50) DEFAULT 'queued' NOT NULL,
	"lease_id" text,
	"leased_at" timestamp with time zone,
	"lease_expires_at" timestamp with time zone,
	"attempts" integer DEFAULT 0,
	"result" jsonb,
	"error" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_device_secrets" ADD CONSTRAINT "cocktail_device_secrets_device_id_cocktail_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."cocktail_devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_devices" ADD CONSTRAINT "cocktail_devices_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_devices" ADD CONSTRAINT "cocktail_devices_vps_id_cockpit_vps_id_fk" FOREIGN KEY ("vps_id") REFERENCES "public"."cockpit_vps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_enrollment_tokens" ADD CONSTRAINT "cocktail_enrollment_tokens_device_id_cocktail_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."cocktail_devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_metrics_latest" ADD CONSTRAINT "cocktail_metrics_latest_device_id_cocktail_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."cocktail_devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cocktail_tasks" ADD CONSTRAINT "cocktail_tasks_device_id_cocktail_devices_id_fk" FOREIGN KEY ("device_id") REFERENCES "public"."cocktail_devices"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_devices_user_id_idx" ON "cocktail_devices" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_devices_vps_id_idx" ON "cocktail_devices" USING btree ("vps_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_devices_status_idx" ON "cocktail_devices" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_devices_last_seen_at_idx" ON "cocktail_devices" USING btree ("last_seen_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_tasks_device_id_status_idx" ON "cocktail_tasks" USING btree ("device_id","status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cocktail_tasks_status_lease_expires_at_idx" ON "cocktail_tasks" USING btree ("status","lease_expires_at");