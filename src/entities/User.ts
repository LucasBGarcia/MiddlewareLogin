import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    email: string;

    @Column({ type: 'integer' })
    admin_id: Number;

    @Column({ type: 'text' })
    cargo: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'text', nullable: true })
    telefone: string
}