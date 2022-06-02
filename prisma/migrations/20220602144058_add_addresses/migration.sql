-- CreateTable
CREATE TABLE "Adress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "zip" TEXT NOT NULL,

    CONSTRAINT "Adress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Adress" ADD CONSTRAINT "Adress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
