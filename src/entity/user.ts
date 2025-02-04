import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", length: 255 })
	firstName!: string;

	@Column({ type: "varchar", length: 255 })
	lastName!: string;

	@Column({ type: "int" })
	age!: number;
}
