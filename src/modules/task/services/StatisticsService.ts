import redis from '#infrastructure/redis/redis.js'

export default class StatisticsService {
    public static async boot() {
        const sub = redis.duplicate()
        await sub.subscribe('task_events')

        sub.on('message', async (channel, message) => {
            if (channel === 'task_events') {
                const { type, payload } = JSON.parse(message)
                console.log(`[STATS] Processing event ${type}`, payload)

                // Example: Increment total tasks in Redis
                if (type === 'TASK_CREATED') {
                    await redis.incr('stats:total_tasks')
                }

                if (type === 'TASK_COMPLETED') {
                    await redis.incr('stats:completed_tasks')
                }
            }
        })
    }
}
