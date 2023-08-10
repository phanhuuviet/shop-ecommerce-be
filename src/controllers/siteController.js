class siteController {
    index(req, res, next) {
        res.send("hello site");
    }
}

module.exports = new siteController();
