import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'
import TeacherValidator from 'App/Validators/TeacherValidator'

export default class TeachersController {
  public async store ({ request, response }: HttpContextContract) {
    try {
      // Valida os dados recebidos na requisição usando o método validate do objeto request
      const data = await request.validate(TeacherValidator)

      // Obtém o último registro de professor para determinar o número sequencial da matrícula
      const lastTeacher = await Teacher.query().orderBy('id', 'desc').first()

      // Gera o número sequencial da matrícula
      const sequentialNumber = lastTeacher ? lastTeacher.id + 1 : 1
      const formattedSequentialNumber = sequentialNumber.toString().padStart(4, '0')

      // Cria a matrícula no formato "PR0010" (por exemplo)
      const registration = `PR${formattedSequentialNumber}`

      // Cria o objeto que contera os dados do professor
      const obj = {
        name: data.name,
        email: data.email,
        registration: registration,
        birthdate:data.birthdate,

      }
      // Se a validação passar, cria um novo professor com os dados da requisição
      await Teacher.create({...obj})

      // Retorna o novo professor criado na resposta
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
      // Consulta o professor pelo ID e seleciona apenas os campos desejados
      const teacher = await Teacher.query()
        .where('id', params.id)
        .select('id', 'name', 'email', 'registration', 'birthdate')
        .first()
      if (teacher) {
        // Retorna os dados do professor se encontrado
        return response.status(200).json(teacher)
      } else {
        // Se nenhum professor for encontrado com o número do ID informado
        return response.status(404).json({ message: 'Not Found' })
      }
    } catch (error) {
      // Trata quaisquer erros que ocorram durante o processo
      console.log(error)
      return response.status(500).json(error.message)
    }
  }

  public async update ({params, request, response } : HttpContextContract){
    try{
      // Valida os dados recebidos na requisição usando o TeacherValidator
      const data = await request.validate(TeacherValidator)

      // Encontra o professor pelo ID
      const teacher = await Teacher.findOrFail(params.id)

      // Atualiza os dados do professor com os novos valores
      teacher.name = data.name
      teacher.email = data.email
      teacher.birthdate = data.birthdate

      // Salva o registro do professor atualizado
      await teacher.save()
      return response.status(200).json('Updated')
    } catch (error) {
      // Trata quaisquer erros que ocorram durante o processo
      console.log(error)
      return response.status(500).json(error.message)
    }
  }

  public async destroy ({ params, response }: HttpContextContract){
    try{
      // Busca o professor pelo ID
      const teacher = await Teacher.findByOrFail('id', params.id)
      if (teacher) {
        // Exclui os dados do professsor
        await teacher.delete()
        return response.status(200).json('Deleted')
      }
    }catch (error) {
      // Trata quaisquer erros que ocorram durante o processo
      console.log(error)
      return response.status(500).json(error.message)
    }
  }
}
