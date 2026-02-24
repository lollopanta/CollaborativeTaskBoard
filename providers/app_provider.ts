import { ApplicationService } from '@adonisjs/core/types'
import EventDispatcher from '#modules/task/services/EventDispatcher.js'
import Ws from '#infrastructure/websocket/SocketServer.js'
import StatisticsService from '#modules/task/services/StatisticsService.js'

export default class AppProvider {
    constructor(protected app: ApplicationService) { }

    public async boot() {
        const emitter = await this.app.container.make('emitter')

        // Initialize Event Dispatcher
        EventDispatcher.init(emitter)

        // Boot Statistics Service
        await StatisticsService.boot()
    }

    public async ready() {
        const server = await this.app.container.make('server')

        // Boot WebSocket Server
        await Ws.boot(server)
    }
}
