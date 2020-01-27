import { UserRepository } from '../repository/user.repository';
import { getCustomRepository } from 'typeorm';
import { PlaylistRepository } from '../repository/playlist.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class UserService {

    relations = ['favorites'];

    private repository = getCustomRepository(UserRepository);
    private playlistRepository = getCustomRepository(PlaylistRepository);

    // GET functions ------------------------------------------
    async getAll() {
        return await this.repository.find({relations: this.relations});
    }


    // POST-PUT functions -------------------------------------
    async insert(user: any) {
        await this.repository.create(user);
        return await this.repository.save(user);
    }

    async toggleFavoriteTrack(id: number, user: any) {
        const playlistToToggle = await this.playlistRepository.findOne(id);
        const userWhoToggle = await this.repository.findOne(user.id, {relations: this.relations})
        const indexPlaylist: number | any = userWhoToggle?.favorites?.findIndex(playlist => playlist.id === playlistToToggle?.id);
        console.log(indexPlaylist);
        if (indexPlaylist > -1) {
            userWhoToggle?.favorites?.splice(indexPlaylist, 1);
            this.repository.save(userWhoToggle!);
            return `Playlist ${playlistToToggle?.id} removed from user ${userWhoToggle?.id} favorites`;

        } else {
            userWhoToggle?.favorites?.push(playlistToToggle!);
            this.repository.save(userWhoToggle!);
            return `Playlist ${playlistToToggle?.id} added to user ${userWhoToggle?.id} favorites`;

        }
    }

}
