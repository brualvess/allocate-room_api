import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Student from 'App/Models/Student'
import EmailValidator from 'App/Validators/StudentValidator'

export default class StudentsController {
  public async store ({ request, response }: HttpContextContract) {
    try {
      // Valida os dados recebidos na requisição usando o método validate do objeto request
      const data = await request.validate(EmailValidator)

      // Obtém o último registro de aluno para determinar o número sequencial da matrícula
      const lastStudent = await Student.query().orderBy('id', 'desc').first()

      // Gera o número sequencial da matrícula
      const sequentialNumber = lastStudent ? lastStudent.id + 1 : 1
      const formattedSequentialNumber = sequentialNumber.toString().padStart(4, '0')

      // Cria a matrícula no formato "MA0001" (por exemplo)
      const registration = `MA${formattedSequentialNumber}`

      // Cria o objeto que contera os dados do aluno
      const obj = {
        name: data.name,
        email: data.email,
        registration: registration,
        birthdate:data.birthdate,

      }
      // Se a validação passar, cria um novo aluno com os dados da requisição
      await Student.create({...obj})

      // Retorna o novo aluno criado na resposta
      return response.status(201).json({message: 'Usuário cadastrado com sucesso'})
    } catch (error) {
      // Se a validação falhar, retorna as mensagens de erro
      console.log(error)
      return response.status(400).json(error.messages)
    }
  }
}
