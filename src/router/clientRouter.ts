import { AuthService } from './../services/AuthService';
import express from 'express';
import { ClientService } from '../services';

const db = ClientService.getInstance();
const auth = AuthService.getInstance();
export const clientRouter = express.Router();


clientRouter.get('/client', (req, res) => {
    db.getAll().subscribe((client) => {
        return res.json(client);
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.get('/client/:id', (req, res) => {
    if (!req.params.id || !Number(req.params.id)) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }
    db.getByIndex(Number(req.params.id)).subscribe((client) => {
    if (!res == null) {
        return res.json(client);
    } else {
        return res.sendStatus(404);
    }}, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/addClient', (req, res) => {
    if (!req.body.name || !req.body.idLogin) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }
    console.log(auth.isAuthenticated(Number(req.body.idLogin)));
    if (!auth.isAuthenticated(Number(req.body.idLogin))) {
        return res.status(401).send('para realizar essa operação é necessario estar logado');
    }

    db.create(req.body.name).subscribe(() => {
        return res.send('cliente cadastrado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/updateClient', (req, res) => {

    if (!req.body.name || !req.body.id || !req.body.idLogin) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }

    if (!auth.isAuthenticated(Number(req.body.idLogin))) {
        return res.status(401).send('para realizar essa operação é necessario estar logado');
    }

    db.update(req.body).subscribe(() => {
        return res.send('cliente alterado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/deleteClient', (req, res) => {
    if (!req.body.id || !req.body.idLogin) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }
    if (!auth.isAuthenticated(Number(req.body.idLogin))) {
        return res.status(401).send('para realizar essa operação é necessario estar logado');
    }
    db.delete(req.body.id).subscribe(() => {
        return res.send('User deletado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/login', (req, res) => {
    if (!req.body.email && !req.body.password) {
        return res.status(401).send('Parametros Ausentes');
    }
    auth.login(req.body.email, req.body.password).subscribe((r) => {
        return res.json(r);
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/logout', (req, res) => {
    if (!req.body.id) {
        return res.status(401).send('Parametros Ausentes');
    }
    auth.logout(Number(req.body.id)).subscribe(() => {
        return res.send('logoff efetuado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});
