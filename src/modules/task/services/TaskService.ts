import Task from '../models/Task.js'
import TaskMoved from '../events/TaskMoved.js'
import TaskCompleted from '../events/TaskCompleted.js'
import TaskCreated from '../events/TaskCreated.js'

export default class TaskService {
    public async create(data: Partial<Task>) {
        const task = await Task.create({
            ...data,
            version: 1,
            status: 'todo'
        })
        await TaskCreated.dispatch(task)
        return task
    }

    public async moveTask(id: number, toColumnId: number, position: number, version: number) {
        const task = await Task.findOrFail(id)

        // Optimistic locking check
        if (task.version !== version) {
            throw new Error('CONCURRENT_MODIFICATION_CONFLICT')
        }

        const fromColumnId = task.columnId
        task.columnId = toColumnId
        task.position = position
        task.version += 1

        await task.save()

        await TaskMoved.dispatch(task, fromColumnId, toColumnId)
        return task
    }

    public async completeTask(id: number, version: number) {
        const task = await Task.findOrFail(id)

        if (task.version !== version) {
            throw new Error('CONCURRENT_MODIFICATION_CONFLICT')
        }

        task.status = 'done'
        task.version += 1

        await task.save()

        await TaskCompleted.dispatch(task)
        return task
    }
}
