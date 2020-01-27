import { getCustomRepository } from 'typeorm';
import { PlaylistRepository } from '../repository/playlist.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class PlaylistService {


    private repository = getCustomRepository(PlaylistRepository);

    // GET functions ----------------------------------------------------
    async getAll(title: string, genre: string) {
        const where: any = [];
        const option: any = {};
        if (title !== undefined) { where.push({ title }); }
        if (genre !== undefined) { where.push({ genre }); }
        if (where.length > 0) { option.where = where; }
        return await this.repository.find(option);
    }

    async getOne(id: number) {
        return await this.repository.findOne(id)
    }

    // POST-PUT functions -----------------------------------------------
    async insert(playlist: any) {
        await this.repository.create(playlist);
        return await this.repository.save(playlist);
    }

    async modify(id: number, playlist: any) {
        await this.repository.update(id, playlist);
        return await this.repository.findOne(id);
    }


    // DELETE functions -------------------------------------------------
    async suppress(id: number) {
        return await this.repository.delete(id);
    }
}
