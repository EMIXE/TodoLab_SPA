const {Router} = require('express')
const router = Router()
const Todo = require('../models/Todo')
const User = require('../models/User')
session = require('express-session');
const auth = require('../middleware/auth.middleware')
const config = require('config')
var ObjectID = require('mongodb').ObjectID;

// api/todos/
router.get('/', auth, async (req,res) => {
    try {
        const todos = await Todo.find({user: req.user.userId})
        res.json(todos)
    } catch(e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова "})
    }
})

// router.get('/create', (req,res) => {
//     res.render('create', {
//         title: 'Create student',
//         isCreate: true
//     })
// })

// router.get('/read', (req,res) => {
//         res.render('read', {
//         title: 'Read student',
//         isRead: true
//     })
// })

// router.get('/update', (req,res) => {
//     res.render('update', {
//         title: 'Update todos',
//         isUpdate: true
//     })
// })
// router.get('/delete', auth, (req,res) => {
//     console.log('delete get lool')
// })

// api/todos/create
router.post('/create', auth, async (req, res) => {
    try {
        const baseUrl = config.get('baseUrl')
        const {name} = req.body

        const todo = new Todo({
            name: name, description: ' ', completed: false, user: req.user.userId
        })
        await todo.save()
        res.status(201).json(todo)

    } catch(e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова "})
    }

})

router.post('/delete', auth, async (req,res) => {
    console.log('yees')
    const {id} = req.body
    console.log(id)
    const todo = await Todo.findByIdAndRemove(id)
    console.log('compls')
    
})

router.get('/:id', auth, async (req,res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        res.json(todo)
    } catch(e) {
        res.status(500).json({message: "Что-то пошло не так, попробуйте снова "})
    }
})

router.post('/update', auth, async(req,res) => {
    const name = req.body.name
    const id = req.body.id
    const description = req.body.description
    
    const data = {name: req.body.name, description: req.body.descrition}

    const todo = await Todo.findById(id)
    console.log(todo)
    console.log(data)
   
    Todo.updateOne({_id: {$eq: id}}, data, (err) => {
        if (err) {
            console.log(err)
        } else {
            res.json(todo);
        }
    })
    todo.save()

    const ntodo = await Todo.findById(id)
    console.log(ntodo)
    
})

module.exports = router