const ServiceModel = require("../model/ServiceModel");

module.exports = {
    checkServiceStatus: function(req, res, next) {

        const service_id = req.params.id;

        ServiceModel.getServiceByID(req.con, service_id,function (err, service) {
            service.forEach(function (service) {
                if (service.state === 0)
                {
                    res.redirect("/fr/espace-client/mes-services")
                    req.session.message = "fdfdf";
                } else {
                    return next();
                }
            })
        })
        
    },
};