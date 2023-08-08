import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export class LoginController {
    async login(req: Request, res: Response) {
        const { email, password } = req.body

        const user = await userRepository.findOneBy({ email })

        if (!user) {
            throw new BadRequestError('Email ou senha inválido')
        }

        const verifyPassword = await bcrypt.compare(password, user.password)

        if (!verifyPassword) {
            throw new BadRequestError('Email ou senha inválido')
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_PASS ?? '', { expiresIn: '4h' })
        const { password: _, ...userLogin } = user

        return res.json({
            user: userLogin,
            token: token
        })


    }
    async getProfile(req: Request, res: Response) {
        return res.json(req.user)
    }

}
