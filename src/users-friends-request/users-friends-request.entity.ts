import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users-friends-request')
export class UsersFriendsRequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  friendId: number;

  @Column()
  status: string;
}
