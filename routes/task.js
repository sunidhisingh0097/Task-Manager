const { Router } = require('express')
const { Tasks, Notes } = require('../db')

const route = Router()

route.get('/', async (req, res) => {
  const tasks = await Tasks.findAll()
  res.send(tasks)
})

route.get('/:id', async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'task id must be an integer',
    })
  }
  
  const task = await Tasks.findByPk(req.params.id)

  if (!task) {
    return res.status(404).send({
      error: 'No task found with id = ' + req.params.id,
    })
  }
  res.send(task)
})

route.get('/:id/notes', async(req, res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'task id must be an integer'
        })
    }

    const notes = await Notes.findAll(
      {where: {taskId: req.params.id}}
    )

    if (!notes) {
        return res.status(404).send({
            error: 'No note found with id = ' + req.params.id,
        })
    }

    res.send(notes)
})

route.post('/', async (req, res) => {
    if (typeof req.body.title !== 'string') {
      return res.status(400).send({ error: 'Title not provided' })
    }
  
    await Tasks.create({
        title: req.body.title,
        description: req.body.description,
        due_date: req.body.due_date,
        priority: req.body.priority
    })
    
    res.status(201).send({ success: 'New task added'})
})

route.put('/:id', async(req, res) => {

    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
            error: 'task id must be an integer',
        })
    }

    Tasks.update( { 
        due_date: req.body.updatedDueDate, 
        priority: req.body.updatedPriority, 
        status: req.body.updatedStatus
    },
        { 
            where: {
                id: req.params.id
            } 
        }
    );

    res.status(200).send({success: `Task ${req.params.id} updated successfully`})

})

route.post('/:id/notes', async(req, res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
        error: 'task id must be an integer',
    })
  }

  const notes = await Notes.findByPk(req.params.id)

  await Notes.create({
    taskId: req.params.id,
    note: req.body.note
  })

  res.status(200).send({success: `Note created successfully`})

})

module.exports = route