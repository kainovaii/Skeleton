module.exports = {
    getUserByEmail: function(con, email, callback) {
        con.query(`SELECT * FROM users WHERE email = '${email}'`, callback)
    },

    getUserByID: function(con, id, callback) {
        con.query(`SELECT * FROM users WHERE id = '${id}'`, callback)
    },

    getUserByName: function(con, username, callback) {
        con.query(`SELECT * FROM users WHERE username = '${username}'`, callback)
    },

    createUser: function(con, data, callback) {
        con.query(
            `INSERT INTO users SET
                username = '${data.username}', 
                password = 'ShW#Zs9cNi1q',
                email = 'player@sypercraft.fr',
                rank = 'default',
                status = '0',
                activation_key = '${data.activation_key}'`,
            callback
        )
    },

    updateUserPass: function(con, password, id, callback) {
        con.query(
            `UPDATE users SET 
              password = '${password}',
              status = '1'
              WHERE id = ${id}`,
            callback
        )
    },
}