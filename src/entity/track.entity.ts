import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Playlist } from './playlist.entity';

@Entity('track')
export class Track {

    @PrimaryGeneratedColumn({ type: 'int'})
    id!: number;

    @Column({type: 'varchar', length: 128, nullable: false})
    title!: string;

    @Column({type: 'varchar', length: 128, nullable: false})
    artist!: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    album_picture!: string;

    @Column({type: 'varchar', length: 128, nullable: false})
    youtube_url!: string;

    @ManyToMany(type => Playlist, playlist => playlist.tracks)
    @JoinTable()
    playlists?: Playlist[];
}
