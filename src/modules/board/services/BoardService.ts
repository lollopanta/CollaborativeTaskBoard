import Board from '../models/Board.js'

export default class BoardService {
    public async getAll() {
        return await Board.all()
    }

    public async getById(id: number) {
        return await Board.query()
            .where('id', id)
            .preload('columns', (query) => {
                query.preload('tasks', (tQuery) => {
                    tQuery.orderBy('position', 'asc')
                })
                query.orderBy('position', 'asc')
            })
            .firstOrFail()
    }

    public async create(data: { name: string, ownerId: number }) {
        return await Board.create(data)
    }
}
