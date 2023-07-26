import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RoomValidator {
  constructor (protected ctx: HttpContextContract) { }

  public schema = schema.create({
    room_number : schema.number([
      rules.unsigned(),
      rules.required(),

    ]),
    capacity: schema.number([
      rules.unsigned(),
    ]),
    teacher_id : schema.number([
      rules.unsigned(),
      rules.required(),
    ]),

  })
  public messages: CustomMessages = {
    'room_number.required': 'O campo room_id é obrigatório.',
    'room_number.unsigned': 'O campo room_id deve ser um número positivo.',
    'teacher_id.required': 'O campo teacher_id é obrigatório.',
    'teacher_id.unsigned': 'O campo teacher_id deve ser um número positivo.',
  }
}
