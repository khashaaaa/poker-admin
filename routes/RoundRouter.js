const RoundController = require('../controllers/RoundController')

const rtr = require('express').Router()

rtr.post("/start", RoundController.startGame)
rtr.post("/over", RoundController.endGame)

const RoundRouter = rtr

module.exports = { RoundRouter }