import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('column_id').unsigned().references('id').inTable('columns').onDelete('CASCADE')
      table.string('title').notNullable()
      table.text('description').nullable()
      table.string('status').notNullable()
      table.integer('position').notNullable()
      table.integer('version').notNullable().defaultTo(1)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}