const {proxmoxApi} = require("proxmox-api");
const {ProxmoxEngine} = require("proxmox-api");
const dump = require("var_dump")

module.exports = {

    test: function (req, res) {
        res.render("xterm")

    }
    // End
}