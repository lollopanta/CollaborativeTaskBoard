import type { HttpContext } from '@adonisjs/core/http'
import Column from '#modules/column/models/Column.js'

export default class ColumnsController {
    public async store({ params, request, response }: HttpContext) {
        const { name, position } = request.only(['name', 'position'])

        const column = await Column.create({
            boardId: params.boardId,
            name,
            position: position || 0
        })

        return response.created(column)
    }

    public async index({ params, response }: HttpContext) {
        const columns = await Column.query().where('board_id', params.boardId).orderBy('position', 'asc')
        return response.ok(columns)
    }
}
