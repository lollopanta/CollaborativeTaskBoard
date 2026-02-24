import type { Emitter } from '@adonisjs/core/events'
import redis from '#infrastructure/redis/redis.js'

export default class EventDispatcher {
    public static init(emitter: Emitter<any>) {
        // @ts-ignore
        emitter.on('task:created', async (task) => {
            await redis.publish('task_events', JSON.stringify({ type: 'TASK_CREATED', payload: task }))
        })

        // @ts-ignore
        emitter.on('task:moved', async ({ task, fromColumnId, toColumnId }) => {
            await redis.publish('task_events', JSON.stringify({
                type: 'TASK_MOVED',
                payload: { task, fromColumnId, toColumnId }
            }))
        })

        // @ts-ignore
        emitter.on('task:completed', async (task) => {
            await redis.publish('task_events', JSON.stringify({ type: 'TASK_COMPLETED', payload: task }))
        })
    }
}
