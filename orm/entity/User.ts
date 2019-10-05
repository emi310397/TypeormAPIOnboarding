import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Post} from "./Post";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column()
    isActive: boolean;

    @OneToMany(type => Post, post => post.craftedBy)
    posts: Post[];
}
