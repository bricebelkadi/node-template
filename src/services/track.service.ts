import { getCustomRepository } from 'typeorm';
import { TrackRepository } from '../repository/track.repository';
/**
 * Cette classe est un service
 * C'est ici que l'ensemble de la logique consernant les psort doit apparaitre.
 * Attention ! Mettez le moins possible d'element dans le controlleur
 */
export class TrackService {


    private repository = getCustomRepository(TrackRepository);

    // Business logic
    async getAll() {
        return await this.repository.find();
    }

    async insert(track: any) {
        await this.repository.create(track);
        return await this.repository.save(track);
    }

}
