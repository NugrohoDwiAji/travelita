-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('SHUTTLE', 'TRIP', 'PRIVATE_CAR', 'SPEAR_CAR', 'TICKET');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'PROCESSING');

-- CreateEnum
CREATE TYPE "ShuttleType" AS ENUM ('ONE_WAY', 'ROUND_TRIP');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "country" TEXT,
    "city" TEXT NOT NULL,
    "profilePicture" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "details" INTEGER NOT NULL,
    "type" "BookingType" NOT NULL,
    "status" "BookingStatus" NOT NULL,
    "paymentProof" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_content" (
    "id" TEXT NOT NULL,
    "serviceType" "BookingType" NOT NULL,
    "badge" TEXT,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "ctaPrimary" TEXT,
    "ctaSecondary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_package" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "features" TEXT NOT NULL,
    "badge" TEXT,
    "highlighted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "service_package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_faq" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "service_faq_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "service_route" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "tag" TEXT,
    "type" TEXT,
    "icon" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shuttle_booking" (
    "id" SERIAL NOT NULL,
    "shuttleType" "ShuttleType" NOT NULL,
    "from" TEXT NOT NULL,
    "to" TEXT NOT NULL,
    "leavingTime" TIMESTAMP(3) NOT NULL,
    "returnTime" TIMESTAMP(3),
    "passengerCount" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shuttle_booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_userId_key" ON "profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "service_content_serviceType_key" ON "service_content"("serviceType");

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_package" ADD CONSTRAINT "service_package_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "service_content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_faq" ADD CONSTRAINT "service_faq_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "service_content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "service_route" ADD CONSTRAINT "service_route_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "service_content"("id") ON DELETE CASCADE ON UPDATE CASCADE;
