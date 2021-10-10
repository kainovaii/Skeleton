module.exports = {
    get_user: function(con, user_id, callback) {
        con.query('SELECT * FROM administrator WHERE id='+user_id, callback)
    },
}