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
      return response.status(201).json({
        message: 'Created',
        name: obj.name,
        registration: obj.registration,

      })
    } catch (error) {
      // Se a validação falhar, retorna as mensagens de erro
      console.log(error)
      return response.status(400).json(error.messages)
    }
  }

  public async show ({ params, response }: HttpContextContract){
    try{
      // Consulta o aluno pelo ID e seleciona apenas os campos desejados
      const student = await Student.query()
        .where('id', params.id)
        .select('id', 'name', 'email', 'registration', 'birthdate')
        .first()
      if (student) {
        // Retorna os dados do aluno se encontrado
        return response.status(200).json(student)
      } else {
        // Se nenhum aluno for encontrado com o número do ID informado
        return response.status(404).json({ message: 'Not Found' })
      }
    } catch (error) {
      // Trata quaisquer erros que ocorram durante o processo
      console.log(error)
      return response.status(500).json(error.message)
    }
  }
  public async destroy ({ params, response }: HttpContextContract){
    try{
      // Busca o aluno pelo ID
      const student = await Student.findByOrFail('id', params.id)
      if (student) {
        // Exclui o aluno
        await student.delete()
        return response.status(200).json('Deleted')
      }
    }catch (error) {
      // Trata quaisquer erros que ocorram durante o processo
      console.log(error)
      return response.status(500).json(error.message)
    }
  }
}
