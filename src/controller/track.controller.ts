import express, { Router, Request, Response, Application } from 'express';
import { TrackService } from '../services/track.service';

/**
 * Ce controller vous servira de modèle pour construire vos différent controller
 * Le controlle rest la partie de l'application qui est en charge de la reception
 * des requetes http.
 *
 * @param app l'application express
 */
export const TrackController = (app: Application) => {

    const trackRouter: Router = express.Router();
    const trackService = new TrackService();

    // GET routes --------------------------------------------------------
    trackRouter.get('/', async (req: Request, res: Response) => {
        const title = req.query.title;
        const artist = req.query.artist;
        res.send(await trackService.getAll(title, artist));
    });

    trackRouter.get('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        res.send(await trackService.getOne(id));
    });


    // POST-PUT routes ---------------------------------------------------
    trackRouter.post('/', async (req: Request, res: Response) => {
        const track = req.body;
        res.send(await trackService.insert(track));
    });

    trackRouter.put('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const playlist = req.body;
        res.send(await trackService.modify(id, playlist));
    });


    // DELETE routes -----------------------------------------------------
    trackRouter.delete('/:id', async (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        try {
            await trackService.suppress(id);
            res.send('Track deleted correctly !').status(204);
        } catch (error) {
            res.send(error).status(400);
        }
    });

    app.use('/track', trackRouter);
};
