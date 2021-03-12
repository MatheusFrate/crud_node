import { Observable } from 'rxjs';
import { IClient } from '../interfaces';
import { createPool, MysqlError, Pool } from 'mysql';
import { DbConfig } from '../config';

export class ClientService {

    private static instance: ClientService | null;

    private pool: Pool = createPool(DbConfig);

    public static getInstance(): ClientService {

        if (!ClientService.instance) {
            ClientService.instance = new ClientService();
        }

        return ClientService.instance;
    }

    public static destroyInstance(): void {
        ClientService.instance = null;
    }


    public getAll(): Observable<IClient[]> {
        return new Observable<IClient[]>((obs) => {
            const query = `SELECT * FROM client`;

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



    public create(name: string): Observable<IClient> {
        return new Observable<any>((obs) => {
            const query =
            `INSERT INTO client ( name) VALUES (?)`;
            this.pool.query({ sql: query, values: [name] },
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

    public update(cli: any): Observable < any > {

        return new Observable<any>((obs) => {
            const query = `UPDATE client SET name = ? WHERE id = ?`;


            this.pool
                .query({ sql: query, values: [
                    cli.name,
                    cli.id]
                },
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
            const query = `DELETE FROM client WHERE id = ?`;
            this.pool
                .query({ sql: query, values: id },
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



    public getByIndex(id: number): Observable<IClient[]> {
        return new Observable<any[]>((obs) => {
            const query = `SELECT * FROM client where id = ?`;
            this.pool
                .query({ sql: query, values: id }, (err: any | null, results?: any) => {
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


