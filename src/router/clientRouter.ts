import { AuthService } from './../services/AuthService';
import { ClientService } from '../services';
import express from 'express';

const db = ClientService.getInstance();
const auth = AuthService.getInstance();
export const clientRouter = express.Router();


clientRouter.get('/client', (req, res) => {
    const isAuth = auth.isAuthenticated(req);
    if (!isAuth.status) {
        return res.status(401).send(isAuth.msg);
    }

    db.getAll().subscribe((client) => {
        return res.json(client);
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.get('/client/:id', (req, res) => {
    const isAuth = auth.isAuthenticated(req);

    if (!isAuth.status) {
        return res.status(401).send(isAuth.msg);
    }

    if (!req.params.id || !Number(req.params.id)) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }

    db.getByIndex(Number(req.params.id)).subscribe((client) => {
        return res.json(client);
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/addClient', (req, res) => {

    const isAuth = auth.isAuthenticated(req);

    if (!isAuth.status) {
        return res.status(401).send(isAuth.msg);
    }

    if (!req.body.name) {
        return res.status(401).json('Parametros Ausentes. Tente Novamente.');
    }

    db.create(req.body.name).subscribe(() => {
        return res.json('cliente cadastrado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/updateClient', (req, res) => {

    const isAuth = auth.isAuthenticated(req);

    if (!isAuth.status) {
        return res.status(401).send(isAuth.msg);
    }

    if (!req.body.name || !req.body.id) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }

    db.update(req.body).subscribe(() => {
        return res.json('cliente alterado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/deleteClient', (req, res) => {
    const isAuth = auth.isAuthenticated(req);

    if (!isAuth.status) {
        return res.status(401).send(isAuth.msg);
    }

    if (!req.body.id) {
        return res.status(401).send('Parametros Ausentes. Tente Novamente.');
    }

    db.delete(req.body.id).subscribe(() => {
        return res.json('User deletado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/login', (req, res) => {
    if (!req.body.email && !req.body.password) {
        return res.status(401).send('Parametros Ausentes');
    }

    if (auth.isAuthenticatedEmail(req.body.email)) {
        return res.status(401).send('Usuário Já está conectado.');
    }

    auth.login(req.body.email, req.body.password).subscribe((r) => {
        return res.json(r);
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

clientRouter.post('/logout', (req, res) => {
    const isAuth = auth.isAuthenticated(req);

    if (!isAuth.status) {
        return res.status(401).send(isAuth.msg);
    }

    if (!req.body.id) {
        return res.status(401).send('Parametro Ausente');
    }

    auth.logout(Number(req.body.id)).subscribe(() => {
        return res.json('logoff efetuado com sucesso');
    }, (err) => {
        return res.status(500).json({error: err, msg: 'Internal Server Error'});
    });
});

