import express from 'express'


import { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } from '../controllers/todo.controller.js'

const router = express.Router();

router.post('/create',createTodo);
router.get('/showtodos' , getTodos);
router.put('/:id' , updateTodo);
router.get('/:id' , getTodoById);
router.delete('/:id' , deleteTodo);

export default router

