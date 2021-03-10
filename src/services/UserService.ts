import { createPool, Pool } from 'mysql';
import { Observable } from 'rxjs';
import { IUser } from './../interfaces/iUser';
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
}
