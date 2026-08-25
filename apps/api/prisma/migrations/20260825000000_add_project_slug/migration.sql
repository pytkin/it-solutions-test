ALTER TABLE "Project" ADD COLUMN "slug" TEXT;

UPDATE "Project"
SET "slug" = 'seller-platform'
WHERE "id" = (
  SELECT "id"
  FROM "Project"
  WHERE "title" = 'Seller Platform' AND "sortOrder" = 10
  ORDER BY "id" ASC
  LIMIT 1
);

UPDATE "Project"
SET "slug" = 'air-planner'
WHERE "id" = (
  SELECT "id"
  FROM "Project"
  WHERE "title" = 'Air Planner' AND "sortOrder" = 20
  ORDER BY "id" ASC
  LIMIT 1
);

UPDATE "Project"
SET "slug" = 'webloftdesign'
WHERE "id" = (
  SELECT "id"
  FROM "Project"
  WHERE "title" = 'Webloftdesign' AND "sortOrder" = 30
  ORDER BY "id" ASC
  LIMIT 1
);

CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
