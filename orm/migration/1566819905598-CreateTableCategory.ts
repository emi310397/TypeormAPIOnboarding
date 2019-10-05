import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableCategory1566819905598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "categories",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "45",
                    isUnique: true,
                    isNullable: false
                },
            ]
        }), true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("categories");
    }
}
