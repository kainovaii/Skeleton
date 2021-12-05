module.exports = {
    getAllProducts: function(con, callback) {
        con.query(`SELECT * FROM products`, callback)
    },

    getProductID: function(con, id, callback) {
        con.query(`SELECT * FROM products WHERE id = '${id}'`, callback)
    },
}