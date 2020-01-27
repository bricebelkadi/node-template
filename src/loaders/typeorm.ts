import { createConnection } from 'typeorm';
import { User } from '../entity/user.entity';
import { Playlist } from '../entity/playlist.entity';
import { Track } from '../entity/track.entity';

export default async () => {

await createConnection({
    type: 'mysql',
    host: process.env.TEMPLATE_DB_HOST,
    port: parseInt(process.env.TEMPLATE_DB_PORT || '3306', 10),
    username: process.env.TEMPLATE_DB_USER,
    password: process.env.TEMPLATE_DB_PASS, 
    database: process.env.TEMPLATE_DB,
    entities: [
        User,
        Playlist,
        Track,
    ],
    synchronize: true,
});
};
