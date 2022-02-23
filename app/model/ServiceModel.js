module.exports = {
    getAllService: function(con, callback) {
        con.query(`SELECT * FROM users_services`, callback)
    },

    getAllServiceByUser: function(con, user_id, callback) {
        con.query(`SELECT * FROM users_services WHERE user_id = '${user_id}'`, callback)
    },

    getServiceByID: function(con, id, callback) {
        con.query(`SELECT * FROM users_services WHERE id = '${id}'`, callback)
    },

    getServiceSharedUser: function(con, service_id, callback) {
        con.query(`SELECT * FROM shared_users_services WHERE service_id = '${service_id}'`, callback)
    },

    create: function(con, data, callback) {
        con.query(
            `INSERT INTO users_services SET
                name = '${data.name}', 
                address = '${data.address}', 
                deadline = '${data.deadline}', 
                state = '0', 
                price = '${data.price}', 
                user_id = '${data.userid}',
                lxc_id = '0'`,
            callback
        )
    },
}