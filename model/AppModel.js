module.exports = {
    get: function(con, table ,callback) {
        con.query(`SELECT * FROM ${table}`, callback)
    },
}
