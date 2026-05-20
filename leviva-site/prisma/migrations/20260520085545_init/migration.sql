-- CreateTable
CREATE TABLE "BookingLead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "sourceMarket" TEXT NOT NULL,
    "residenceCountry" TEXT NOT NULL,
    "travelerCount" INTEGER NOT NULL,
    "tripLength" TEXT NOT NULL,
    "startDate" DATETIME,
    "destinations" TEXT NOT NULL,
    "interests" TEXT NOT NULL,
    "budgetRange" TEXT NOT NULL,
    "accommodationStyle" TEXT NOT NULL,
    "notes" TEXT,
    "consent" BOOLEAN NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "BookingLead_createdAt_idx" ON "BookingLead"("createdAt");

-- CreateIndex
CREATE INDEX "BookingLead_status_idx" ON "BookingLead"("status");
