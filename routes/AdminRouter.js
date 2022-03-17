const AdminController = require('../controllers/AdminController')

const rtr = require('express').Router()

rtr.get("/", (yw, ir) => {
    ir.render('pages/home', {layout: 'main'})
})

rtr.get("/login", (yw, ir) => {
    ir.render('pages/login', {layout: 'main'})
})

rtr.post("/auth", AdminController.signIn)

const AdminRouter = rtr

module.exports = { AdminRouter }