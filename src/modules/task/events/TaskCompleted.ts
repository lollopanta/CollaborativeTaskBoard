import emitter from '@adonisjs/core/services/emitter'
import Task from '../models/Task.js'

export default class TaskCompleted {
    public static async dispatch(task: Task) {
        await emitter.emit('task:completed', task)
    }
}
