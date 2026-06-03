-- CreateTable
CREATE TABLE "private_car_pricing" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL DEFAULT 350000,
    "fullDayMultiplier" DOUBLE PRECISION NOT NULL DEFAULT 1.8,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "private_car_pricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "private_car_pricing_contentId_key" ON "private_car_pricing"("contentId");

-- AddForeignKey
ALTER TABLE "private_car_pricing" ADD CONSTRAINT "private_car_pricing_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "service_content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
