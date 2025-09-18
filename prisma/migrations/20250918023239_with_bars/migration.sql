/*
  Warnings:

  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name,barId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,barId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,barId]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,categoryId,barId]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,categoryId,barId]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barId` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `barId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_categoryId_fkey";

-- DropIndex
DROP INDEX "public"."categories_name_key";

-- DropIndex
DROP INDEX "public"."categories_slug_key";

-- DropIndex
DROP INDEX "public"."products_name_categoryId_key";

-- DropIndex
DROP INDEX "public"."products_slug_key";

-- AlterTable
ALTER TABLE "public"."categories" ADD COLUMN     "barId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."products" ADD COLUMN     "barId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."users";

-- DropEnum
DROP TYPE "public"."Role";

-- CreateTable
CREATE TABLE "public"."bars" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bars_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_barId_key" ON "public"."categories"("name", "barId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_barId_key" ON "public"."categories"("slug", "barId");

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_barId_key" ON "public"."categories"("id", "barId");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_categoryId_barId_key" ON "public"."products"("name", "categoryId", "barId");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_categoryId_barId_key" ON "public"."products"("slug", "categoryId", "barId");

-- AddForeignKey
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_barId_fkey" FOREIGN KEY ("barId") REFERENCES "public"."bars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_categoryId_barId_fkey" FOREIGN KEY ("categoryId", "barId") REFERENCES "public"."categories"("id", "barId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_barId_fkey" FOREIGN KEY ("barId") REFERENCES "public"."bars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
