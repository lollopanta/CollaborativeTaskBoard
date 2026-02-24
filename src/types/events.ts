import Task from '../modules/task/models/Task.js'

declare module '@adonisjs/core/types' {
    interface EventsList {
        'task:created': Task
        'task:completed': Task
        'task:moved': {
            task: Task
            fromColumnId: number
            toColumnId: number
        }
    }
}
