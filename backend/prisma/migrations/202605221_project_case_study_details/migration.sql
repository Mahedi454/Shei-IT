DO $$ BEGIN
  CREATE TYPE "PublishStatus" AS ENUM ('draft', 'published');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE "ContactStatus" AS ENUM ('new', 'replied', 'archived');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS "Blog" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "excerpt" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "coverImage" TEXT,
  "tags" TEXT[] NOT NULL,
  "status" "PublishStatus" NOT NULL DEFAULT 'draft',
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Project" (
  "id" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "image" TEXT NOT NULL,
  "categories" TEXT[] NOT NULL,
  "metric" TEXT,
  "metricLabel" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "detailEyebrow" TEXT,
  "detailType" TEXT,
  "liveUrl" TEXT,
  "clientRepositoryUrl" TEXT,
  "serverRepositoryUrl" TEXT,
  "overview" TEXT,
  "problem" TEXT,
  "features" JSONB,
  "roles" JSONB,
  "architectureFlow" JSONB,
  "techStack" JSONB,
  "paymentTitle" TEXT,
  "paymentDescription" TEXT,
  "paymentReliabilityTitle" TEXT,
  "paymentReliabilityDescription" TEXT,
  "status" "PublishStatus" NOT NULL DEFAULT 'draft',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Contact" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "company" TEXT,
  "phone" TEXT,
  "service" TEXT,
  "budget" TEXT,
  "message" TEXT NOT NULL,
  "status" "ContactStatus" NOT NULL DEFAULT 'new',
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "Blog_slug_key" ON "Blog"("slug");
CREATE UNIQUE INDEX IF NOT EXISTS "Project_slug_key" ON "Project"("slug");

ALTER TABLE "Project"
ADD COLUMN IF NOT EXISTS "detailEyebrow" TEXT,
ADD COLUMN IF NOT EXISTS "detailType" TEXT,
ADD COLUMN IF NOT EXISTS "liveUrl" TEXT,
ADD COLUMN IF NOT EXISTS "clientRepositoryUrl" TEXT,
ADD COLUMN IF NOT EXISTS "serverRepositoryUrl" TEXT,
ADD COLUMN IF NOT EXISTS "overview" TEXT,
ADD COLUMN IF NOT EXISTS "problem" TEXT,
ADD COLUMN IF NOT EXISTS "features" JSONB,
ADD COLUMN IF NOT EXISTS "roles" JSONB,
ADD COLUMN IF NOT EXISTS "architectureFlow" JSONB,
ADD COLUMN IF NOT EXISTS "techStack" JSONB,
ADD COLUMN IF NOT EXISTS "paymentTitle" TEXT,
ADD COLUMN IF NOT EXISTS "paymentDescription" TEXT,
ADD COLUMN IF NOT EXISTS "paymentReliabilityTitle" TEXT,
ADD COLUMN IF NOT EXISTS "paymentReliabilityDescription" TEXT;
