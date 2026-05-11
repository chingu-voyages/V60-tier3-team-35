CREATE TABLE "plant_watering_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"user_plant_id" integer NOT NULL,
	"watered_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "plants" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image_url" text,
	"watering" text,
	"sunlight" text,
	"hardiness" text
);
--> statement-breakpoint
CREATE TABLE "push_notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plant_id" text NOT NULL,
	"endpoint" text NOT NULL,
	"notification_type" text NOT NULL,
	"last_sent_date" date
);
--> statement-breakpoint
CREATE TABLE "push_subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"endpoint" text NOT NULL,
	"p256dh" text NOT NULL,
	"auth" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "push_subscriptions_endpoint_unique" UNIQUE("endpoint")
);
--> statement-breakpoint
CREATE TABLE "user_settings" (
	"user_id" text PRIMARY KEY NOT NULL,
	"home_location" text DEFAULT 'Leipzig'
);
--> statement-breakpoint
CREATE TABLE "users_plants" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"plant_id" text,
	"phase" text DEFAULT 'planning',
	"watering_frequency" integer,
	"last_watered_date" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "plant_watering_logs" ADD CONSTRAINT "plant_watering_logs_user_plant_id_users_plants_id_fk" FOREIGN KEY ("user_plant_id") REFERENCES "public"."users_plants"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "push_notifications" ADD CONSTRAINT "push_notifications_endpoint_push_subscriptions_endpoint_fk" FOREIGN KEY ("endpoint") REFERENCES "public"."push_subscriptions"("endpoint") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_plants" ADD CONSTRAINT "users_plants_plant_id_plants_id_fk" FOREIGN KEY ("plant_id") REFERENCES "public"."plants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "push_notification_unique_idx" ON "push_notifications" USING btree ("user_id","plant_id","endpoint","notification_type");--> statement-breakpoint
CREATE UNIQUE INDEX "endpoint_idx" ON "push_subscriptions" USING btree ("endpoint");