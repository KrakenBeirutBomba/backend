/*
  Warnings:

  - You are about to drop the column `createdAt` on the `bars` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `bars` table. All the data in the column will be lost.
  - You are about to drop the column `barId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `barId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,bar_id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,bar_id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,bar_id]` on the table `categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,category_id,bar_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug,category_id,bar_id]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `bars` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bar_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bar_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."categories" DROP CONSTRAINT "categories_barId_fkey";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_barId_fkey";

-- DropForeignKey
ALTER TABLE "public"."products" DROP CONSTRAINT "products_categoryId_barId_fkey";

-- DropIndex
DROP INDEX "public"."categories_id_barId_key";

-- DropIndex
DROP INDEX "public"."categories_name_barId_key";

-- DropIndex
DROP INDEX "public"."categories_slug_barId_key";

-- DropIndex
DROP INDEX "public"."products_name_categoryId_barId_key";

-- DropIndex
DROP INDEX "public"."products_slug_categoryId_barId_key";

-- AlterTable
ALTER TABLE "public"."bars" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."categories" DROP COLUMN "barId",
DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "updatedAt",
ADD COLUMN     "bar_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."products" DROP COLUMN "barId",
DROP COLUMN "categoryId",
DROP COLUMN "createdAt",
DROP COLUMN "imageUrl",
DROP COLUMN "updatedAt",
ADD COLUMN     "bar_id" TEXT NOT NULL,
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_bar_id_key" ON "public"."categories"("name", "bar_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_bar_id_key" ON "public"."categories"("slug", "bar_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_id_bar_id_key" ON "public"."categories"("id", "bar_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_name_category_id_bar_id_key" ON "public"."products"("name", "category_id", "bar_id");

-- CreateIndex
CREATE UNIQUE INDEX "products_slug_category_id_bar_id_key" ON "public"."products"("slug", "category_id", "bar_id");

-- AddForeignKey
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_bar_id_fkey" FOREIGN KEY ("bar_id") REFERENCES "public"."bars"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_category_id_bar_id_fkey" FOREIGN KEY ("category_id", "bar_id") REFERENCES "public"."categories"("id", "bar_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."products" ADD CONSTRAINT "products_bar_id_fkey" FOREIGN KEY ("bar_id") REFERENCES "public"."bars"("id") ON DELETE CASCADE ON UPDATE CASCADE;
