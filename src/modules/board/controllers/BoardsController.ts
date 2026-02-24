import type { HttpContext } from '@adonisjs/core/http'
import BoardService from '../services/BoardService.js'

export default class BoardsController {
    private boardService = new BoardService()

    public async index({ response }: HttpContext) {
        const boards = await this.boardService.getAll()
        return response.ok(boards)
    }

    public async show({ params, response }: HttpContext) {
        const board = await this.boardService.getById(params.id)
        return response.ok(board)
    }

    public async store({ request, response }: HttpContext) {
        const data = request.only(['name', 'ownerId'])
        const board = await this.boardService.create(data as any)
        return response.created(board)
    }
}
