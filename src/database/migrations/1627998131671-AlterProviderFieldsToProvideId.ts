import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export default class AlterProviderFieldsToProvideId1627998131671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('appointments', 'provider');
      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider_id',
        type: 'varchar',
        isNullable: true
      }));

      await queryRunner.createForeignKey('appointments', new TableForeignKey({
        name: 'appointments_provider_fk',
        columnNames: ['provider_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropForeignKey('appointments', 'appointments_provider_fk');

      await queryRunner.dropColumn('appointments', 'provider_id');

      await queryRunner.addColumn('appointments', new TableColumn({
        name: 'provider',
        type: 'varchar'
      }));
    }

}
