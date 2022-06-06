-- DropForeignKey
ALTER TABLE "CategoryOnProduct" DROP CONSTRAINT "CategoryOnProduct_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoryOnProduct" DROP CONSTRAINT "CategoryOnProduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "CategoryOnProduct" ADD CONSTRAINT "CategoryOnProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryOnProduct" ADD CONSTRAINT "CategoryOnProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
