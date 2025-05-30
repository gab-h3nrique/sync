"use strict"

import pg from 'pg'

const { Pool, Client } = pg

function db() {

    let pool: any
    let client: any

    async function init() {

        if (global.connection) return await global.connection.connect();
     
        const { Pool } = require('pg');
    
        pool = new Pool({ connectionString: process.env.DATABASE_URL });
    
        client = await pool.connect()
     
        const res = await client.query('SELECT NOW()')
    
        await client.release()
     
        global.connection = pool;
    
        await pool.connect();

    }

    init()

    return {

        query: async(query: string) => {

            const { rows } = await client.query(query)

            return rows
        }

    }

}

const database = db()

export default database
