import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Track } from './track.entity';
import { User } from './user.entity';

@Entity('playlist')
export class Playlist {

    @PrimaryGeneratedColumn({ type: 'int' })
    id!: number;

    @Column({ type: 'varchar', length: 25, nullable: false })
    title!: string;

    @Column({ type: 'varchar', length: 15, nullable: false })
    genre!: string;

    @ManyToMany(type => Track, track => track.playlists)
    tracks?: Track[];

    @ManyToMany(type => User, user => user.playlists)
    users?: User[];

    @ManyToMany(type => User, user => user.favorites)
    @JoinTable()
    favoriters?: User[];
}
