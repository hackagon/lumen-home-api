import { MigrationInterface, QueryRunner } from "typeorm";

export class booking1687622160322 implements MigrationInterface {
    name = 'booking1687622160322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "customer" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" character varying NOT NULL,
                CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "room" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "code" character varying NOT NULL,
                "price" integer NOT NULL,
                CONSTRAINT "PK_c6d46db005d623e691b2fbcba23" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "booking" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "room_id" integer,
                "customer_id" character varying,
                "start_date" TIMESTAMP NOT NULL,
                "end_date" TIMESTAMP NOT NULL,
                CONSTRAINT "PK_49171efc69702ed84c812f33540" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "apartment" (
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "address" character varying NOT NULL,
                CONSTRAINT "PK_c3d874d9924f6f16223162b3d3a" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "booking"
            ADD CONSTRAINT "FK_e35dcb428979ee7cc7808440126" FOREIGN KEY ("room_id") REFERENCES "room"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "booking"
            ADD CONSTRAINT "FK_ae80346292fa587731a5d2546e6" FOREIGN KEY ("customer_id") REFERENCES "customer"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "booking" DROP CONSTRAINT "FK_ae80346292fa587731a5d2546e6"
        `);
        await queryRunner.query(`
            ALTER TABLE "booking" DROP CONSTRAINT "FK_e35dcb428979ee7cc7808440126"
        `);
        await queryRunner.query(`
            DROP TABLE "apartment"
        `);
        await queryRunner.query(`
            DROP TABLE "booking"
        `);
        await queryRunner.query(`
            DROP TABLE "room"
        `);
        await queryRunner.query(`
            DROP TABLE "customer"
        `);
    }

}
