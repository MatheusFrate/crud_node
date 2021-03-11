import { createPool, Pool } from 'mysql';
import { Observable } from 'rxjs';
import { IUser, IUserAuthentication } from './../interfaces/iUser';
import { UserService } from './UserService';

const userService = UserService.getInstance();

export class AuthService {

    private static instance: AuthService | null;
    private pool: Pool = createPool({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'exemplo'
    });

    public static getInstance(): AuthService {

        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }

        return AuthService.instance;
    }

    public static destroyInstance(): void {
        AuthService.instance = null;
    }

    public login(body: IUser): Observable<any[]> {
        return new Observable<any[]>((obs) => {
            const query = `SELECT * FROM user where email = ? and password = ?`;
            this.pool
                .query({ sql: query, values: [body.email, body.password] },
                    (err: any | null, results?: any) => {
                if (err) {
                    obs.error(err);
                    obs.complete();
                    return;
                }
                obs.next(results);
                obs.complete();
                }).start();
            const query2 = `UPDATE user SET isauthenticated = TRUE where email = ?`;
            this.pool
                .query({ sql: query2, values: [body.email]},
                    (err2: any | null, results2?: any) => {
                if (err2) {
                    obs.error(err2);
                    obs.complete();
                    return;
                }
                obs.next(results2);
                obs.complete();
                }).start();
        });
    }

    public isAuthenticated(id: number): boolean {
        const user: Observable<IUserAuthentication> =  userService.getByIndex(id);
    }

    public logout(id: number): Observable<any[]> {
        return new Observable<any[]>((obs) => {
            const query2 = `UPDATE user SET isauthenticated = FALSE where id = ?`;
                this.pool
                    .query({ sql: query2, values: [id]},
                        (err2: any | null, results2?: any) => {
                    if (err2) {
                        obs.error(err2);
                        obs.complete();
                        return;
                    }
                    obs.next(results2);
                    obs.complete();
                    }).start();
            });
    }
}
