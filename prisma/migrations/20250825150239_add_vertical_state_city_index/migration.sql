-- DropIndex
DROP INDEX "Lead_state_city_idx";

-- CreateIndex
CREATE INDEX "Lead_vertical_state_city_idx" ON "Lead"("vertical", "state", "city");
