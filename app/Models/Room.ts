import { DateTime } from 'luxon'
import { BaseModel, column, ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'

import Student from './Student'

export default class Room extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public room_number: number

  @column()
  public capacity: number

  @column()
  public teacher_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Student, {
    pivotTable: 'room_student',
  })
  public students: ManyToMany<typeof Student>
}
