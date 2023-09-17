module.exports = {
    client: 'mysql2',
    connection: {
        host: process.env.MYSQLADDRESS,
        port: 3306,
        database: 'count',
        user: 'root',
        password: process.env.MYSQLPASSWORD
    }
}