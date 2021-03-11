import { AuthService } from './../services/AuthService';
import { UserService } from './../services/UserService';
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
    const token = auth.isAuthenticated(req.body.id);
    if (token === false) {
        return res.status(401).send('para realizar essa operação é necessario estar logado');
    } else if (!req.body.name) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }
    if (!req.body.name) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }
    db.create(req.body.name).subscribe(() => {
        return res.send('cliente cadastrado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/updateClient', (req, res) => {
    const token = auth.isAuthenticated(req.body.id);
    if (token === false) {
        return res.status(401).send('para realizar essa operação é necessario estar logado');
    } else if (!req.body.name) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }
    if (!req.body.name || !req.body.id) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }
    db.update(req.body).subscribe(() => {
        return res.send('cliente alterado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/deleteClient', (req, res) => {
    if (!req.body.id) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
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
    auth.login(req.body).subscribe(() => {
        return res.send('login efetuado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/logout', (req, res) => {
    if (!req.body.id) {
        return res.status(401).send('Parametros Ausentes');
    }
    auth.logout(req.body).subscribe(() => {
        return res.send('logoff efetuado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});
