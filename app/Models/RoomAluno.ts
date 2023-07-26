import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Student from './Student'
import Room from './Room'

export default class RoomAluno extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public room_id: number

  @column()
  public student_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Room, {
    foreignKey: 'room_id',
  })
  public room: BelongsTo<typeof Room>

  @belongsTo(() => Student, {
    foreignKey: 'student_id',
  })
  public student: BelongsTo<typeof Student>
}
