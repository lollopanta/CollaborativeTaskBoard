import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Column from '../../column/models/Column.js'

export default class Board extends BaseModel {
    @column({ isPrimary: true })
    declare id: number

    @column()
    declare name: string

    @column()
    declare ownerId: number

    @column.dateTime({ autoCreate: true })
    declare createdAt: any

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: any

    @hasMany(() => Column)
    declare columns: HasMany<typeof Column>
}
