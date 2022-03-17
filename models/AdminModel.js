const { connector } = require('../database/connector')

const AdminModel = (admin) => {
    this.phone = admin.phone
    this.password = admin.password
}

AdminModel.init = (result) => {

    let sql = `
    CREATE TABLE IF NOT EXISTS admin(
        id serial PRIMARY KEY,
        phone VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(50) NOT NULL,
        created TIMESTAMP DEFAULT NOW()
    )
    `

    connector.connect((err, conn) => {
        if(err) {
            result(err, null)
            return
        }

        conn.query(sql, (error, success) => {
            if(error) {

                result(error, null)
            }
            result(null, success)
        })
    })
}

AdminModel.auth = (creds, result) => {

    connector.connect((err, conn) => {
        if(err) {
            result(err, null)
            return
        }

        conn.query("SELECT * FROM admin WHERE phone = $1 AND password = $2", [creds.phone, creds.password], (error, success) => {
            if(error) {
                result(error, null)
                return
            }
            if(success.rows.length == 0) {
                result("Хэрэглэгч байхгүй байна", null)
                return
            }
            result(null, success.rows)
            return
        })
    })
}

module.exports = { AdminModel }