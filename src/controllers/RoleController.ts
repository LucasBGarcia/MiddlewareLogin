import { Request, Response } from "express";
import { BadRequestError, UnauthorizedError } from "../helpers/api-erros";

import bcrypt from 'bcrypt'
import { roleRepository } from "../repositories/roleRepository";

export class RoleController {
    async create(req: Request, res: Response) {
        const { name, description } = req.body

        const RoleExists = await roleRepository.findOneBy({ name })

        if (RoleExists) {
            throw new BadRequestError('Role já existe')
        }

        const newRole = roleRepository.create({
            name,
            description
        })

        await roleRepository.save(newRole)

        return res.status(201).json(newRole)
    }

    async index(req: Request, res: Response) {
        const RoleExists = await roleRepository.find()

        if (!RoleExists) {
            throw new UnauthorizedError('Nenhuma role cadastrados')
        }

        return res.status(200).json(RoleExists)
    }
    async update(req: Request, res: Response) {
        const { id } = req.params

        try {

            const role = await roleRepository.findOneBy({ id: Number(id) })
            if (!role) {
                return res.status(404).json({ message: 'Role não encontrada.' })
            }
            const Role = await roleRepository.update(id, req.body)

            if (Role.affected) {
                const RoleUpdated = await roleRepository.findOneBy({ id: Number(id) })
                return res.status(201).json(RoleUpdated)
            }

            return res.status(404).json({ message: 'Role não encontrada' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Sever Error' })
        }
    }
    async delete(req: Request, res: Response) {
        const { id } = req.params

        try {

            const Role = await roleRepository.findOneBy({ id: Number(id) })
            if (!Role) {
                return res.status(404).json({ message: 'Role não encontrada.' })
            }

            await roleRepository.delete({ id: Number(id) })
            return res.status(201).send()


        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Internal Sever Error' })
        }
    }
}
