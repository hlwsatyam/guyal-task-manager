const express = require('express')
const { getAllTodos, createTodo, deleteTodo,updateTodo } = require('../Controllers/TodoController')

const TodoRouter = express.Router()

TodoRouter.post('/',getAllTodos) 
TodoRouter.post('/create',createTodo)
TodoRouter.post('/update',updateTodo)
TodoRouter.post('/delete',deleteTodo)

 
module.exports = TodoRouter