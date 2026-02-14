CREATE TABLE IF NOT EXISTS "cockpit_terminal_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"vps_id" uuid NOT NULL,
	"status" varchar(50) DEFAULT 'created' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"connected_at" timestamp with time zone,
	"closed_at" timestamp with time zone,
	"expires_at" timestamp with time zone,
	"meta" jsonb
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cockpit_terminal_sessions" ADD CONSTRAINT "cockpit_terminal_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cockpit_terminal_sessions" ADD CONSTRAINT "cockpit_terminal_sessions_vps_id_cockpit_vps_id_fk" FOREIGN KEY ("vps_id") REFERENCES "public"."cockpit_vps"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cockpit_terminal_sessions_user_id_idx" ON "cockpit_terminal_sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cockpit_terminal_sessions_vps_id_idx" ON "cockpit_terminal_sessions" USING btree ("vps_id");