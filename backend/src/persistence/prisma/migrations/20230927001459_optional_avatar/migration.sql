-- DropIndex
DROP INDEX "Account_avatar_url_key";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "avatar_url" DROP NOT NULL,
ALTER COLUMN "avatar_url" SET DEFAULT 'https://i.imgur.com/Zs3EoeR.png';
