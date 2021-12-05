module.exports = {
    getUser: function(con, email, callback) {
        con.query(`SELECT * FROM users WHERE email = '${email}'`, callback)
    },

    getUserID: function(con, id, callback) {
        con.query(`SELECT * FROM users WHERE id = '${id}'`, callback)
    },
}