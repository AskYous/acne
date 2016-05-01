/// <reference path="dbTechnologies.ts"/>
/**
* This class is used to connect to and execute sql queries
*/
export class db {
    pg = require('pg'); // importing postgres
    dbTechnology: dbTechnologies;
    url: string;
    username: string;
    password: string;
    dbName: string;
    conString: string;

    /**
     * constructor - constructor function for the database module
     *
     * @param  {type} dbTechnology: dbTechnologies defined which database technology to use
     * @param  {type} url: string                  the url location of the database
     * @param  {type} username: string             username access to the database
     * @param  {type} password: string             password to the database
     * @param  {type} dbName: string               the name of the database
     * @return {type} void
     */
    constructor(dbTechnology: dbTechnologies, url: string, username: string, password: string, dbName: string) {
        this.dbTechnology = dbTechnology;
        this.url = url;
        this.username = username;
        this.password = password;
        this.dbName = dbName;

        /**
         * switch - Sets the connection string
         */
        switch (this.dbTechnology) {
            case (dbTechnologies.PSQL): {
                this.conString = `postgres://${this.username}:${this.password}@${this.url}/${this.dbName}`;
                break;
            } default: {
                throw "That database technology is not yet supported :(.";
            }
        }
    }

    /**
     * public - Established a connection to the db
     *
     * @param  {type} callback the callback function to run after the connection was successful
     */
    public connect(callback) {
        this.pg.connect(this.conString, function(err, client, done) { // establish the connection
            if (err) return console.error('error fetching client from pool', err); // throws an error if connection fails.
            else callback(client, done); // call the users function, passing it the client (which they can use to run sql queries) and an done function, which they should call after they completed their sql query to close the connection.
        });
    }

    /**
     * public - Executes a sql query and calls the callback function passing in the results
     *
     * @param {type} query the sql query to execute
     * @param {type} callback the callback function to run after
     */
    public executeQuery(query: string, callback: (err: Object, results: Object) => void): void {
        switch (this.dbTechnology) {
            case (dbTechnologies.PSQL): {
              this.connect(function (client, done) {
                  client.query(query, function (err, results) {
                    callback(err, results);
                    done(); // close the SQL connection.
                  });
                });
            }
        }
    }
}
