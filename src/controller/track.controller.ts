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

    const userRouter: Router = express.Router();
    const trackService = new TrackService();

    userRouter.get('/', async (req: Request, res: Response) => {
        res.send(await trackService.getAll());
    });

    userRouter.post('/', async (req: Request, res: Response) => {
        const user = req.body;
        res.send(await trackService.insert(user));
    })

    app.use('/track', userRouter);
};
