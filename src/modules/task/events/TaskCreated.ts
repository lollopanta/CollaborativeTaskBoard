import emitter from '@adonisjs/core/services/emitter'
import Task from '../models/Task.js'

export default class TaskCreated {
    public static async dispatch(task: Task) {
        await emitter.emit('task:created', task)
    }
}
