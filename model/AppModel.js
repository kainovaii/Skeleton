module.exports = {
    getUser: function(con, email, callback) {
        con.query(`SELECT * FROM administrator WHERE email = '${email}'`, callback)
    },

    getUserID: function(con, id, callback) {
        con.query(`SELECT * FROM administrator WHERE id = '${id}'`, callback)
    },
}