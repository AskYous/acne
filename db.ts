/// <reference path="dbTechnologies.ts"/>
/**
* This class is used to connect to and execute sql queries
*/
export class db {

    dbTechnology: dbTechnologies;
    url: string;
    username: string;
    password: string;
    dbName: string;


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
    constructor (dbTechnology: dbTechnologies, url: string, username: string, password: string, dbName: string) {
        this.dbTechnology = dbTechnology;
        this.url = url;
        this.username = username;
        this.password = password;
        this.dbName = dbName;
    }

    public executeQuery (query: string, success: (results?) => void, fail: (results?) => void): void {
      switch (this.dbTechnology){
        case (dbTechnologies.PSQL): {

        }
      }
    }
}
