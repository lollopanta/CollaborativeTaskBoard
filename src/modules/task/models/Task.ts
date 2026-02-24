import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Column from '../../column/models/Column.js'

export default class Task extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare columnId: number

    @column()
    declare title: string

    @column()
    declare description: string | null

    @column()
    declare status: string

    @column()
    declare position: number

    @column()
    declare version: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime

    @belongsTo(() => Column)
    declare column: BelongsTo<typeof Column>
}
