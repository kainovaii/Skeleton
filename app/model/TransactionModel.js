module.exports = {
    get: function(con, callback) {
        con.query(`SELECT * FROM users_transactions`, callback)
    },

    getByUser: function(con, username, callback) {
        con.query(`SELECT * FROM users_transactions WHERE username = '${username}'`, callback)
    },

    create: function(con, data, callback) {
        con.query(
            `INSERT INTO users_transactions SET
                token = '${data.token}', 
                paymentId = '${data.paymentId}',
                PayerID = '${data.PayerID}',
                status = ${data.status},
                username = '${data.username}'`,
            callback
        )
    },

}