import { UserService } from './../services/UserService';
import express from 'express';

const db = UserService.getInstance();

export const userRouter = express.Router();

userRouter.get('/user', (req, res) => {
    db.getAll().subscribe((user) => {
        return res.json(user);
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

// userRouter.post('/addUser', (req, res) => {
//     if(!req.body.name && !req.body.password && !req.body.email) {
//         return res.status(401).send('Parametros ausentes');
//     }

//     db.create()
// });

