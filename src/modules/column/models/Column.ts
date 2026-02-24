import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Board from '../../board/models/Board.js'
import Task from '../../task/models/Task.js'

export default class Column extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare boardId: number

    @column()
    declare name: string

    @column()
    declare position: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @belongsTo(() => Board)
    declare board: BelongsTo<typeof Board>

    @hasMany(() => Task)
    declare tasks: HasMany<typeof Task>
}
