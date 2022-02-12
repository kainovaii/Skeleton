module.exports = {
    getAllProducts: function(con, callback) {
        con.query(`SELECT * FROM products`, callback)
    },

    getProductID: function(con, id, callback) {
        con.query(`SELECT * FROM products WHERE id = '${id}'`, callback)
    },

    getAllProductsByCategory: function(con, category, callback) {
        con.query(`SELECT * FROM products WHERE type = '${category}'`, callback)
    },

    getNewOrder: function(con, callback) {
        con.query(`SELECT * FROM orders WHERE status = '0'`, callback)
    },
}