const { connector } = require('../database/connector')

const RoundModel = (round) => {
    this.id = round.id
    this.start_date = round.start_date,
    this.end_date = round.end_date,
    this.winner = round.winner
}

RoundModel.init = (result) => {

    let sql = `
    CREATE TABLE IF NOT EXISTS round(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        start_date TIMESTAMP,
        end_date TIMESTAMP,
        winner UUID
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

RoundModel.start = (creds, result) => {

    connector.connect((err, conn) => {
        if(err) {
            result(err, null)
            return
        }

        conn.query("INSERT INTO round(start_date) VALUES(current_timestamp)", (error, success) => {
            if(error) {

                result(error, null)
            }
            result(null, success.rows)
        })
    })
}

RoundModel.over = (creds, result) => {

    connector.connect((err, conn) => {
        if(err) {
            result(err, null)
            return
        }

        conn.query("UPDATE round SET end_date = current_timestamp, winner = $1 WHERE id = $2", [creds.winner, creds.id], (error, success) => {
            if(error) {

                result(error, null)
            }
            result(null, success.rows)
        })
    })
}

module.exports = { RoundModel }