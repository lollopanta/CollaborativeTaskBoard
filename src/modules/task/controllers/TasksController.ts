import type { HttpContext } from '@adonisjs/core/http'
import TaskService from '../services/TaskService.js'

export default class TasksController {
    private taskService = new TaskService()

    public async store({ request, response }: HttpContext) {
        const data = request.only(['columnId', 'title', 'description', 'position'])
        const task = await this.taskService.create(data)
        return response.created(task)
    }

    public async move({ params, request, response }: HttpContext) {
        const { toColumnId, position, version } = request.only(['toColumnId', 'position', 'version'])

        try {
            const task = await this.taskService.moveTask(params.id, toColumnId, position, version)
            return response.ok(task)
        } catch (error) {
            if (error.message === 'CONCURRENT_MODIFICATION_CONFLICT') {
                return response.conflict({ message: 'Task has been modified by someone else' })
            }
            throw error
        }
    }

    public async complete({ params, request, response }: HttpContext) {
        const { version } = request.only(['version'])

        try {
            const task = await this.taskService.completeTask(params.id, version)
            return response.ok(task)
        } catch (error) {
            if (error.message === 'CONCURRENT_MODIFICATION_CONFLICT') {
                return response.conflict({ message: 'Task has been modified by someone else' })
            }
            throw error
        }
    }
}
