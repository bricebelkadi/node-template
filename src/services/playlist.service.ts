import { getCustomRepository } from 'typeorm';
import { PlaylistRepository } from '../repository/playlist.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class PlaylistService {


    private repository = getCustomRepository(PlaylistRepository);

    // Business logic
    async getAll() {
        return await this.repository.find();
    }

    async getOne(id: number) {
        return await this.repository.findOne(id)
    }

    async insert(playlist: any) {
        await this.repository.create(playlist);
        return await this.repository.save(playlist);
    }

    async modify(playlist: any) {
        return await this.repository.save(playlist)
    }

}
