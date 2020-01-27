import { getCustomRepository } from 'typeorm';
import { TrackRepository } from '../repository/track.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class TrackService {


    private repository = getCustomRepository(TrackRepository);

    relations = ['playlists'];

    // GET functions ----------------------------------------------------
    async getAll(title: string, artist: string) {
        const where: any = [];
        const option: any = {relations: this.relations};
        if (title !== undefined) { where.push({ title }); }
        if (artist !== undefined) { where.push({ artist }); }
        if (where.length > 0) { option.where = where; }
        return await this.repository.find(option);
    }

    async getOne(id: number) {
        return await this.repository.findOne(id);
    }

    // POST-PUT functions -----------------------------------------------
    async insert(track: any) {
        await this.repository.create(track);
        return await this.repository.save(track);
    }

    async modify(id: number, track: any) {
        const trackToModify: any = await this.repository.findOne(id);
        return await this.repository.save(track);
    }


    // DELETE functions -------------------------------------------------
    async suppress(id: number) {
        return await this.repository.delete(id);
    }

}
