const express = require('express')
const controller = require('../controllers')
const router = new express.Router()

router.post('/tasks', controller.addTasks)
router.get('/tasks', controller.getTasks)
router.put('/tasks/:id', controller.updateTask)
router.get('/tasks/:id', controller.getTask)
router.delete('/tasks/:id', controller.deleteTask)

module.exports = router