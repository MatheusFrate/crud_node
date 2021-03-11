import { createPool, Pool, MysqlError } from 'mysql';
import { observable, Observable } from 'rxjs';
import { updateLanguageServiceSourceFile } from 'typescript';
import { IUser, IUserAuthentication } from './../interfaces/iUser';
export class UserService {
    private static instance: UserService | null;

    private users: IUser[] = [];

    private pool: Pool = createPool({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'exemplo'
    });

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    public static destroyInstance(): void {
        UserService.instance = null;
    }

    public getAll(): Observable<IUser[]> {
        return new Observable<IUser[]>((obs) => {
            const query = `SELECT name, email FROM user`;

            this.pool.query({ sql: query }, (err: any | null, results?: any) => {
                if (err) {
                    obs.error(err);
                    obs.complete();
                    return;
                }

                const res: any[] = results;
                const clients: any[] = [];

                res.map((cli) => {
                    clients.push(cli);
                });
                obs.next(clients);
                obs.complete();
            }).start();
        });
    }

    public getByIndex(id: number): Observable<IUserAuthentication> {
        return new Observable<IUserAuthentication>((obs) => {
            const query = `SELECT * FROM user where id = ?`;
            this.pool
                .query({ sql: query, values: id }, (err: any | null, results?: IUser) => {
                if (err) {
                    obs.error(err);
                    obs.complete();
                    return;
                }
                const res: any = results;
                obs.next(res);
                obs.complete();
            }).start();
        });
    }

    public create(body: IUser): Observable<IUser> {
        return new  Observable<any>((obs) => {
            const query  = `INSERT INTO user ( name, password, email) VALUES (?,?,?)`;
            this.pool.query({sql: query, values: [body.name, body.password, body.email]},
                (err: MysqlError | null, results?: any) => {
                    if (err) {
                        obs.error(err);
                        return;
                    }
                    obs.next(results);
                    obs.complete();
                }).start();
        });
    }

    public update(user: IUser): Observable <IUser> {

        return new Observable<any>((obs) => {
            const query = `UPDATE user SET name = ?, password = ? WHERE id = ?`;

            this.pool.query({sql: query, values: [user.name, user.password, user.id]},
                (err: MysqlError | null, results?: any) => {
                    if (err) {
                        obs.error(err);
                        return;
                    }
                    obs.next(results);
                    obs.complete();
                }).start();
        });
    }

    public delete(id: number): Observable<any> {
        return new Observable<any>((obs) => {
            const query = `DELETE FROM user WHERE id = ?`;
            this.pool.query({sql: query, values: id},
                (err: MysqlError | null, results?: any) => {
                    if (err) {
                        obs.error(err);
                        return;
                    }
                    obs.next(results);
                    obs.complete();
                }).start();
        });
    }
}
