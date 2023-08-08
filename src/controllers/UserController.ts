import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import bcrypt from 'bcrypt'

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password, telefone } = req.body

        const userExists = await userRepository.findOneBy({ email })

        if (userExists) {
            throw new BadRequestError('E-mail já existe')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            name,
            email,
            telefone,
            password: hashPassword,
        })

        await userRepository.save(newUser)

        const { password: _, ...user } = newUser

        return res.status(201).json(user)
    }

    async index(req: Request, res: Response) {
        const userExists = await userRepository.find()

        if (!userExists) {
            throw new UnauthorizedError('Sem usuários cadastrados')
        }

        return res.status(200).json(userExists)
    }
    async update(req: Request, res: Response) {
        const { id } = req.params

        try {

            const User = await userRepository.findOneBy({ id: Number(id) })
            if (!User) {
                return res.status(404).json({ message: 'User não encontrada.' })
            }
            const user = await userRepository.update(id, req.body)

            if (user.affected) {
                const userUpdated = await userRepository.findOneBy({ id: Number(id) })
                return res.status(201).json(userUpdated)
            }

            return res.status(404).json({ message: 'User não encontrado' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Sever Error' })
        }
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {

            const User = await userRepository.findOneBy({ id: Number(id) })
            if (!User) {
                return res.status(404).json({ message: 'Usuário não encontrada.' })
            }

            await userRepository.delete({ id: Number(id) })
            return res.status(201).send()


        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Sever Error' })
        }
    }
}
