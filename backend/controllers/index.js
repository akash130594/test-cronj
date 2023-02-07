const { ObjectId } = require("mongodb")
const Tasks = require("../models/Tasks")

const addTasks = async (req, reply, next) => {
    console.log(req.body)
    const task = new Tasks(req.body)
    try {
        const savedTask = await task.save()
        reply.status(201).send(savedTask)
    } catch(err) {
        if(err?.code === 11000) {
            return reply.status(400).send({
                message: "Task name cannot be duplicate"
            })    
        }
        reply.status(500).send(err)
    }
}

const getTasks = async (req, reply) => {
    const searchParam = req.query.search
    console.log(searchParam)
    let filter = {}
    if(searchParam) {
        filter = {
            name: {
                $regex: searchParam
            }
        }
    }
    const tasks = await Tasks.find({...filter}).exec();
    reply.status(200).send(tasks)
}

const updateTask = async (req, reply) => {
    const data = req.body
    const id = req.params.id
    const task = await Tasks.findOne({_id: new ObjectId(id)})
    if(!data) {
        return reply.status(404).send("Please provide updated data")
    }
    if(!task) {
        return reply.status(404).send("Task not found")
    }
    try {
        const updatedTask = await Tasks.updateOne({_id: new ObjectId(id)}, {...data})
        reply.status(200).send(updatedTask)
    } catch(error) {
        reply.status(500).send(error)
    }
}

const getTask = async (req, reply) => {
    const id = req.params.id
    const task = await Tasks.findOne({_id: new ObjectId(id)})
    if(!task) {
        return reply.status(404).send("Task not found")
    }
    reply.status(200).send(task)
}

const deleteTask = async (req, reply) => {
    const id = req.params.id
    const task = await Tasks.findOne({_id: new ObjectId(id)})
    if(!task) {
        return reply.status(404).send("Task not found")
    }
    const deleteAcknowledge = await Tasks.deleteOne({_id: new ObjectId(id)})
    reply.status(200).send(deleteAcknowledge)
}

module.exports = {
    addTasks,
    getTasks,
    updateTask,
    deleteTask,
    getTask
}