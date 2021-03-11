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

userRouter.get('/user/:id', (req, res) => {
    if (!req.params.id || !Number(req.params.id)) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }

    db.getByIndex(Number(req.params.id)).subscribe((user) => {
    if (!res == null) {
        return res.json(user);
    } else {
        return res.sendStatus(404);
    }}, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});


userRouter.post('/addUser', (req, res) => {
    if(!req.body.name && !req.body.password && !req.body.email) {
        return res.status(401).send('Parametros ausentes');
    }

    db.create(req.body).subscribe(() => {
        return res.send('User cadastrado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

userRouter.post('/updateUser', (req, res) => {
    if(!req.body.id && !req.body.name && !req.body.password) {
        return res.status(401).send('Parametros ausentes');
    }

    db.update(req.body).subscribe(() => {
        return res.send ('User alterado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

userRouter.post('/deleteUser', (req, res) => {
    if(!req.body.id){
        return res.status(401).send('Parametros ausentes');
    }

    db.delete(req.body.id).subscribe(() => {
            return res.send('User deletado com sucesso');
        }, (err) => {
            return res.status(500).json({error: err, msg: 'Internal Server Error'});
        });
});
