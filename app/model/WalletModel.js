module.exports = {
    // Wallet
    get: function(con, callback) {
        con.query(`SELECT * FROM users_wallet`, callback)
    },

    getByUser: function(con, username, callback) {
        con.query(`SELECT * FROM users_wallet WHERE username = '${username}'`, callback)
    },

    create: function(con, data, callback) {
        con.query(
            `INSERT INTO users_wallet SET
                username = '${data.username}',
                solde = '0'`,
            callback
        )
    },

    // Transaction
    tran_get: function(con, callback) {
        con.query(`SELECT * FROM users_wallet_transaction`, callback)
    },

    tran_getByUser: function(con, username, callback) {
        con.query(`SELECT * FROM users_wallet_transaction WHERE username = '${username}'`, callback)
    },

    tran_create: function(con, data, callback) {
        con.query(
            `INSERT INTO users_wallet_transaction SET
                token = '${data.token}', 
                paymentId = '${data.paymentId}',
                PayerID = '${data.PayerID}',
                status = ${data.status},
                username = '${data.username}'`,
            callback
        )
    },
}