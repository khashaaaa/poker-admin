const { connector } = require('../database/connector')

const PlayerModel = (player) => {
    this.username = player.username,
    this.phone = player.phone,
    this.email = player.email,
    this.card_1 = player.card_1,
    this.card_2 = player.card_2,
    this.round_id = player.round_id
}

PlayerModel.init = (result) => {

    let sql = `
    CREATE TABLE IF NOT EXISTS player(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username VARCHAR(50) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        card_1 VARCHAR(20) NOT NULL,
        card_2 VARCHAR(20) NOT NULL,
        round_id UUID NOT NULL,
        CONSTRAINT fk_round FOREIGN KEY(round_id) REFERENCES round(id)
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

PlayerModel.create = (creds, result) => {

    connector.connect((err, conn) => {
        if(err) {
            result(err, null)
            return
        }

        conn.query("INSERT INTO player(username, phone, email, card_1, card_2, round_id) VALUES($1, $2, $3, $4, $5, $6)", [creds.username, creds.phone, creds.email, creds.card_1, creds.card_2, creds.round_id], (error, success) => {
            if(error) {

                result(error, null)
            }
            result(null, success)
        })
    })
}

module.exports = { PlayerModel }