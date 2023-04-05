import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import bcrypt from 'bcrypt'

export class UserController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body

        const userExists = await userRepository.findOneBy({ email })

        if (userExists) {
            throw new BadRequestError('E-mail já existe')
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = userRepository.create({
            name,
            email,
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

        return res.status(201).json(userExists)
    }

}
