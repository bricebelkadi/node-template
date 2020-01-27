import express, { Router, Request, Response, Application } from 'express';
import { PlaylistService } from '../services/playlist.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const PlaylistController = (app: Application) => {

    const playlistRouter: Router = express.Router();
    const playlistservice = new PlaylistService();

    // GET routes --------------------------------------------------------
    playlistRouter.get('/', async (req: Request, res: Response) => {
        const title = req.query.title;
        const genre = req.query.genre;
        res.send(await playlistservice.getAll(title, genre));
    });

    playlistRouter.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        res.send(await playlistservice.getOne(id));
    });


    // POST-PUT routes ---------------------------------------------------
    playlistRouter.post('/', async (req: Request, res: Response) => {
        const playlist = req.body;
        res.send(await playlistservice.insert(playlist));
    });

    playlistRouter.put('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const playlist = req.body;
        res.send(await playlistservice.modify(id, playlist));
    });


    // DELETE routes -----------------------------------------------------
    playlistRouter.delete('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        try {
            await playlistservice.suppress(id);
            res.send('Playlist deleted correctly !').status(204);
        } catch (error) {
            res.send(error).status(400);
        }
    });

    app.use('/playlist', playlistRouter);
};
