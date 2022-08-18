import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRoleUserTables1660855108403 implements MigrationInterface {
    name = 'CreateRoleUserTables1660855108403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`role\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_8e1f623798118e629b46a9e629\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_role\` (\`user_id\` varchar(36) NOT NULL, \`role_id\` varchar(36) NOT NULL, INDEX \`IDX_d0e5815877f7395a198a4cb0a4\` (\`user_id\`), INDEX \`IDX_32a6fc2fcb019d8e3a8ace0f55\` (\`role_id\`), PRIMARY KEY (\`user_id\`, \`role_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_d0e5815877f7395a198a4cb0a46\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_role\` ADD CONSTRAINT \`FK_32a6fc2fcb019d8e3a8ace0f55f\` FOREIGN KEY (\`role_id\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`INSERT INTO role (id, name, createdAt, updatedAt) VALUES ('03c1fcb4-a7b1-4c48-9d89-2aa5dda7614a', 'Admin', '2022-08-18 23:42:05', '2022-08-18 23:42:06');`)
        await queryRunner.query(`INSERT INTO role (id, name, createdAt, updatedAt) VALUES ('423171cc-e59c-41cb-a150-439146cc4df0', 'User', '2022-08-18 23:42:42', '2022-08-18 23:42:43');`)
        await queryRunner.query(`INSERT INTO role (id, name, createdAt, updatedAt) VALUES ('6349abc0-9e5b-408e-98e0-3d4fcf9e0579', 'Superadmin', '2022-08-18 23:41:11', '2022-08-18 23:42:45.335215');`)
        await queryRunner.query(`INSERT INTO role (id, name, createdAt, updatedAt) VALUES ('873288f3-0def-49e7-ba20-4ed52e3d1346', 'Driver', '2022-08-18 23:42:21', '2022-08-18 23:42:22');`)

        await queryRunner.query(`INSERT INTO user (id, username, email, phone, createdAt, updatedAt) VALUES ('0e86e87f-501f-4af0-9663-6328955fecdf', 'Bob', 'bob@gmail.com', '+22222222222', '2022-08-18 23:46:14', '2022-08-18 23:46:16');`)
        await queryRunner.query(`INSERT INTO user (id, username, email, phone, createdAt, updatedAt) VALUES ('27516f59-7f14-4ed3-bef9-8ba51b0b9b2f', 'Alex', 'alex@gmail.com', '+11111111111', '2022-08-18 23:45:56', '2022-08-18 23:45:58');`)
        await queryRunner.query(`INSERT INTO user (id, username, email, phone, createdAt, updatedAt) VALUES ('b329c8c9-b523-4429-a9cc-fee3ab9e23fe', 'Miro', 'miro@gmail.com', '+55555555555', '2022-08-18 23:47:10', '2022-08-18 23:47:11');`)
        await queryRunner.query(`INSERT INTO user (id, username, email, phone, createdAt, updatedAt) VALUES ('dc4e6e97-3421-46d4-a967-81466a317dd1', 'Serg', 'serg@gmail.com', '+44444444444', '2022-08-18 23:46:46', '2022-08-18 23:46:47');`)
        await queryRunner.query(`INSERT INTO user (id, username, email, phone, createdAt, updatedAt) VALUES ('e7e291fb-c2ea-4c4a-9bc8-80508428d02e', 'Rob', 'rob@gmail.com', '+33333333333', '2022-08-18 23:46:31', '2022-08-18 23:46:32');`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_32a6fc2fcb019d8e3a8ace0f55f\``);
        await queryRunner.query(`ALTER TABLE \`user_role\` DROP FOREIGN KEY \`FK_d0e5815877f7395a198a4cb0a46\``);
        await queryRunner.query(`DROP INDEX \`IDX_32a6fc2fcb019d8e3a8ace0f55\` ON \`user_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_d0e5815877f7395a198a4cb0a4\` ON \`user_role\``);
        await queryRunner.query(`DROP TABLE \`user_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_8e1f623798118e629b46a9e629\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`role\``);
    }

}
