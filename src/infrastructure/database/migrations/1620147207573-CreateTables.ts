import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1620147207573 implements MigrationInterface {
  name = 'CreateTables1620147207573';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "book" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "isbn" character varying NOT NULL, "title" character varying NOT NULL, "subtitle" character varying NOT NULL, "originalTitle" character varying NOT NULL, "publisher" character varying NOT NULL, "publishedDate" TIMESTAMP NOT NULL, "pageCount" integer NOT NULL, "overview" character varying NOT NULL, "authorsFirstname" character varying NOT NULL, "authorsLastname" character varying NOT NULL, "imageImagename" character varying NOT NULL, CONSTRAINT "UQ_bd183604b9c828c0bdd92cafab7" UNIQUE ("isbn"), CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying NOT NULL, "universityID" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_1af8965cab06dea34dfc5ac4eca" UNIQUE ("universityID"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "book"`);
  }
}
