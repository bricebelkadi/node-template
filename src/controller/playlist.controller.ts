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

    const userRouter: Router = express.Router();
    const playlistservice = new PlaylistService();

    // GET routes --------------------------------------------------------
    userRouter.get('/', async (req: Request, res: Response) => {
        res.send(await playlistservice.getAll());
    });

    userRouter.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        res.send(await playlistservice.getOne(id));
    })

    // POST-PUT routes ---------------------------------------------------
    userRouter.post('/', async (req: Request, res: Response) => {
        const playlist = req.body;
        res.send(await playlistservice.insert(playlist));
    })

    userRouter.put('/', async (req: Request, res: Response) => {
        const playlist = req.body;
        res.send(await playlistservice.modify(playlist))
    })

    app.use('/track', userRouter);
};
