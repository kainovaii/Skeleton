module.exports = {
    getUser: function(con, username, callback) {
        con.query(`SELECT * FROM users WHERE username = '${username}'`, callback)
    },

    getUserID: function(con, id, callback) {
        con.query(`SELECT * FROM users WHERE id = '${id}'`, callback)
    },
}