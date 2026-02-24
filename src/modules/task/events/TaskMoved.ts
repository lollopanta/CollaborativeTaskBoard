import emitter from '@adonisjs/core/services/emitter'
import Task from '../models/Task.js'

export default class TaskMoved {
    public static async dispatch(task: Task, fromColumnId: number, toColumnId: number) {
        await emitter.emit('task:moved', { task, fromColumnId, toColumnId })
    }
}
