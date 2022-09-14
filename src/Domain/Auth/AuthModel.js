module.exports = {
    getAllUser: function(con, callback) {
        con.query(`SELECT * FROM users`, callback)
    },

    getUser: function(con, email, callback) {
        con.query(`SELECT * FROM users WHERE email = '${email}'`, callback)
    },

    getUserID: function(con, id, callback) {
        con.query(`SELECT * FROM users WHERE id = '${id}'`, callback)
    },

    getUserName: function(con, username, callback) {
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

    updateUser: function(con, data, callback) {
        con.query(
            `UPDATE users SET 
              company = '${data.company}',
              tax_id = '${data.tax_id}',
              address1 = '${data.address1}',
              address2 = '${data.address2}',
              city = '${data.city}',
              state = '${data.state}',
              postcode = '${data.postcode}',
              country = '${data.country}'
              WHERE id = ${data.id}`,
            callback
        )
    },

    attemptLogin: function(con, data, callback) {
        con.query(
            `UPDATE users SET
              attempt_login = '${data.attempt}'
              WHERE id = ${data.id}`,
            callback
        )
    },

    blockedLogin: function(con, user, callback) {
        con.query(
            `UPDATE users SET
              status = '2'
              WHERE id = ${user}`,
            callback
        )
    },

    getUserByKey: function(con, activation_key, callback) {
        con.query(`SELECT * FROM users WHERE activation_key = '${activation_key}'`, callback)
    },
}