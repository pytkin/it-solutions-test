CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "contribution" TEXT NOT NULL,
    "technologies" TEXT[],
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "Project_sortOrder_idx" ON "Project"("sortOrder");
