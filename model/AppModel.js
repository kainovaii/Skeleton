module.exports = {
    get_user: function(con, username, callback) {
        con.query("SELECT * FROM `administrator` WHERE username = 'sysadmin'", callback)
    },
}