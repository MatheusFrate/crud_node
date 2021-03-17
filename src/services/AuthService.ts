import { createPool, Pool } from 'mysql';
import { isUndefined } from 'node:util';
import { Observable, throwError, of } from 'rxjs';
import { consoleTestResultHandler } from 'tslint/lib/test';
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
                            return  obs.error('Usuários Duplicados!');
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

    public isAuthenticated(id: number): IUser | undefined {
        console.log(this.sessions);
        return this.sessions.find((f) => f.id === id);
    }


    public logout(id: number): Observable<any> {
        const index = this.sessions.findIndex((f) => f.id === id);

        if (index === -1) {
            return throwError('Falha ao Efetuar Logout. Sessão Não Econtrada.');
        }

        this.sessions.splice(index, 1);

        return of(1);
    }
}
