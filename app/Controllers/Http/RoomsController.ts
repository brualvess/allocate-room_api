import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Teacher from 'App/Models/Teacher'
import Room from 'App/Models/Room'
import RoomValidator from 'App/Validators/RoomValidator'

export default class RoomsController {
  public async store ({ request, response }: HttpContextContract) {
    try {
      // Valida os dados recebidos na requisição usando o método validate do objeto request
      const data = await request.validate(RoomValidator)

      // Verifica se o professor com o id fornecido existe na tabela de professores
      const teacher = await Teacher.findBy('id',data.teacher_id)
      if(!teacher){
        // Caso o professor não exista
        return response.status(404).json('Teacher not found')
      }else{
        // Caso exista
        await Room.create({ ...data })
        return response.status(201).json({message: 'Created', room: data.room_number})
      }
    } catch (error) {
      // Se a validação falhar, retorna as mensagens de erro
      console.log(error)
      return response.status(400).json(error.messages)
    }
  }
}

