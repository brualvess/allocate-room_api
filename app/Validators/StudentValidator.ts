import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EmailValidator {
  constructor (protected ctx: HttpContextContract) { }

  public schema = schema.create({
    name: schema.string(),
    email: schema.string({}, [rules.email()]),
    birthdate: schema.date(),

  })
  public messages: CustomMessages = {
    'name.required': 'O campo nome é obrigatório',
    'email.required': 'O campo de email é obrigatório.',
    'email.email': 'O email deve ser válido.',
    'birthdate.required': 'O campo data de nascimento é obrigatório',
    'email.unique': 'O email já está cadastrado no sistema.',

  }
}
