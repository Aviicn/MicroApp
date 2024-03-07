import { Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm"
import { vote } from "./vote"

export type UserRoleType = "admin" | "editor" | "ghost"
@Entity({ name: "user" })

@Entity()
export class user {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  address: string

  @Column({ nullable: true })
  username: string

  @Column({ nullable: true })
  gender: string

  @Column()
  password: string

  @Column({
    type: "enum",
    enum: ["admin", "editor", "ghost"],
    default: "ghost",
})
role: UserRoleType

  @OneToOne(() => vote, (vote) => vote.user, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  })
  vote: vote

}