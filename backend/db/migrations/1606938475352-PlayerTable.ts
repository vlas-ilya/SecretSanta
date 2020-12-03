import { MigrationInterface, QueryRunner } from "typeorm";

export class PlayerTable1606938475352 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "player" (
        "id" varchar PRIMARY KEY NOT NULL,
        "playerState" varchar NOT NULL,
        "name" varchar NOT NULL,
        "wish" varchar NOT NULL,
        "dontWish" varchar NOT NULL,
        "targetId" varchar,
        "registrationId" varchar,
        "gameState" varchar,
        "type" varchar NOT NULL,
        "gameId" varchar,
        CONSTRAINT "UQ_targetId" UNIQUE ("targetId"),
        CONSTRAINT "FK_gameId_player_id" FOREIGN KEY ("gameId") REFERENCES "player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION,
        CONSTRAINT "FK_targetId_player_id" FOREIGN KEY ("targetId") REFERENCES "player" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
      );
        
      CREATE INDEX player_idx_targetId ON "player" ("targetId");
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX player_idx_targetId;
      DROP TABLE "player";
    `);
  }
}
