import { Request } from 'express';
import { createPool, Pool } from 'mysql';
import { Observable, throwError, of } from 'rxjs';
import { DbConfig } from '../config';
import { IUser } from './../interfaces/iUser';

export class AuthService {

    private static instance: AuthService | null;

    private pool: Pool = createPool(DbConfig);

    private sessions: IUser[] = [];

    public static getInstance(): AuthService {

        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }

        return AuthService.instance;
    }

    public static destroyInstance(): void {
        AuthService.instance = null;
    }

    public login(email: string, pass: string): Observable<IUser> {

        if (this.sessions.find((f) => f.email === email)) {
            return throwError('Sessão Já Está em Uso!');
        }

        return new Observable<IUser>((obs) => {
            const query = `SELECT * FROM user where email = ? and password = ?`;
            this.pool
                .query({ sql: query, values: [email, pass] },
                    (err: any | null, results: any) => {
                        if (err) {
                            return obs.error('erro tlgd?');
                        }
                        if (results.length > 1) {
                            return obs.error('Usuários Duplicados!');
                        }
                        if (results.length < 1) {
                            return obs.error('cadastro não encontrado');
                        }
                        console.log(results[0]);
                        this.sessions.push(results[0]);
                        obs.next(results);
                        return obs.complete();
                    }).start();
        });
    }

    public isAuthenticated(req: Request): {msg: string, status: boolean}  {
        const id = Number(req.get('id'));
        if (!id) {
            return {
                msg: 'Parametro Ausente.',
                status: false
            };
        }

        if (this.sessions.find((f) => f.id === id)) {
            return {
                status: true,
                msg: 'Usuário Autenticado.'
            };
        } else {
            return {
                status: false,
                msg: 'Para Realizar Essa Operação é Necessario Estar Logado.'
            };
        }
    }

    public isAuthenticatedEmail(email: string): boolean {
        return this.sessions.find(f => f.email === email) ? true : false;
    }


    public logout(id: number): Observable<any> {
        const index = this.sessions.findIndex((f) => f.id === id);

        if (index === -1) {
            return throwError('Sessão nao encontrada.');
        }

        this.sessions.splice(index, 1);

        return of(1);
    }
}
