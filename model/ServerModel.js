module.exports = {
    getServerByUser: function(con, user_id, callback) {
        con.query(`SELECT * FROM server WHERE user_id = '${user_id}'`, callback)
    },

    getServerByID: function(con, server_id, callback) {
        con.query(`SELECT * FROM server WHERE server_id = '${server_id}'`, callback)
    },
}