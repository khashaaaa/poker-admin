const { RoundModel } = require('../models/RoundModel')

module.exports = {

    startGame: (yw, ir) => {

        RoundModel.start({}, (error, success) => {
            if(success) {
                return ir.status(200).json(success)
            }
            if(error) {
                return ir.status(500).json({ error: error })
            }
        })
    },

    endGame: (yw, ir) => {

        const round = {
            id: yw.body.id,
            winner: yw.body.winner
        }

        if(yw.body.id && yw.body.winner) {
            RoundModel.over(round, (error, success) => {
                if(success) {
                    return ir.status(200).json(success)
                }
                if(error) {
                    return ir.status(500).json({ error: error })
                }
            })
        }
        else {
            return ir.status(400).json({ warning: "Бүх талбарыг бөглөнө үү" })
        }
    }
}