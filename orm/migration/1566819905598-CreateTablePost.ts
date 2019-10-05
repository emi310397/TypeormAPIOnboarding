import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTablePost1566819905598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: "posts",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: "title",
                    type: "varchar",
                    length: "45",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "content",
                    type: "varchar",
                    length: "45",
                    isUnique: true,
                    isNullable: false
                },
            ]
        }), true, true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable("posts");
    }
}
