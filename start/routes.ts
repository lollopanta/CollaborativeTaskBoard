/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const BoardsController = () => import('#modules/board/controllers/BoardsController.js')
const TasksController = () => import('#modules/task/controllers/TasksController.js')

router.group(() => {
    // Boards
    router.get('boards', [BoardsController, 'index'])
    router.get('boards/:id', [BoardsController, 'show'])
    router.post('boards', [BoardsController, 'store'])

    // Tasks
    router.post('tasks', [TasksController, 'store'])
    router.patch('tasks/:id/move', [TasksController, 'move'])
    router.patch('tasks/:id/complete', [TasksController, 'complete'])
}).prefix('/api/v1')
