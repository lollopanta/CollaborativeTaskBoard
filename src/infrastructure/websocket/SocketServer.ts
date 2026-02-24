import { Server } from 'socket.io'
import { createAdapter } from '@socket.io/redis-adapter'
import type { Server as AdonisServer } from '@adonisjs/core/types'
import redis from '#infrastructure/redis/redis.js'

export default class Ws {
    public static io: Server

    public static async boot(server: AdonisServer) {
        const pubClient = redis
        const subClient = redis.duplicate()

        this.io = new Server(server.getNodeServer(), {
            cors: {
                origin: '*',
            },
            adapter: createAdapter(pubClient, subClient)
        })

        this.io.on('connection', (socket) => {
            console.log('Client connected:', socket.id)

            socket.on('join_board', (boardId) => {
                socket.join(`board:${boardId}`)
                console.log(`Socket ${socket.id} joined board:${boardId}`)
            })

            socket.on('leave_board', (boardId) => {
                socket.leave(`board:${boardId}`)
                console.log(`Socket ${socket.id} left board:${boardId}`)
            })

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id)
            })
        })

        // Listen to Redis events for broadcasting
        const subInternal = redis.duplicate()
        await subInternal.subscribe('task_events')
        subInternal.on('message', (channel: string, message: string) => {
            if (channel === 'task_events') {
                const { type, payload } = JSON.parse(message)

                // Broadcast based on payload boardId
                if (payload && payload.boardId) {
                    this.io.to(`board:${payload.boardId}`).emit('task_event', { type, payload })
                } else {
                    this.io.emit('task_event', { type, payload })
                }
            }
        })
    }
}
