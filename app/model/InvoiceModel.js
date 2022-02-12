module.exports = {
    getAllInvoiceByUser: function (con, user_id, callback) {
        con.query(`SELECT * FROM users_invoices WHERE user_id = '${user_id}'`, callback)
    },

    getInvoiceByID: function (con, id, callback) {
        con.query(`SELECT * FROM users_invoices WHERE id = '${id}'`, callback)
    },

    create: function(con, data, callback) {
        con.query(
            `INSERT INTO users_invoices SET
                state = '0', 
                user_id = '${data.userid}'`,
            callback
        )
    },
}