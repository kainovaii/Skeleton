module.exports = {
    getParams: function (url) {
        const currentUrl = new URL( "http://" + process.env.APP_DOMAIN + url);
        return currentUrl.searchParams;
    }
};