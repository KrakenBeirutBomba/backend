/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `bars` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `bars` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `bars` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."bars" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "bars_name_key" ON "public"."bars"("name");

-- CreateIndex
CREATE UNIQUE INDEX "bars_slug_key" ON "public"."bars"("slug");
