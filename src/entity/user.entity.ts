import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Playlist } from './playlist.entity';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: 'varchar', length: 25, nullable: false})
    first_name!: string;

    @Column({type: 'varchar', length: 15, nullable: false})
    last_name!: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    email!: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    password!: string;

    @ManyToMany(type => Playlist, playlist => playlist.users)
    @JoinTable()
    playlists?: Playlist[];

    @ManyToMany(type => Playlist, playlist => playlist.favoriters)
    favorites?: Playlist[];
}
