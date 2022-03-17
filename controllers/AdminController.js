const { AdminModel } = require("../models/AdminModel")

module.exports = {

    signIn: (yw, ir) => {

        const admin = {
            phone: yw.body.phone,
            password: yw.body.password
        }

        if(yw.body.phone && yw.body.password) {
            AdminModel.auth(admin, (error, success) => {
                if(success) {
                    return ir.redirect('/')
                }
                if(error) {
                    return ir.render('pages/login', { errmsg: error })
                }
            })
        }
        else {
            return ir.render('pages/login', { errmsg: "Бүх талбарыг бөглөнө үү" })
        }
    }
}