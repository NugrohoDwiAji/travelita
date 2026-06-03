-- CreateTable
CREATE TABLE "service_spot" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "depth" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "fish" TEXT,
    "level" TEXT,
    "tag" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_spot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "service_spot" ADD CONSTRAINT "service_spot_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "service_content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
