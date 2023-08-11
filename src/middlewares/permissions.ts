import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export function is(rolesRoutes: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request.body;

        const user = await userRepository.findOne({
            where: { id: userId },
            relations: ["roles"],
        });

        if (!user) {
            return response.status(400).json("User does not exists");
        }

        const roleExists = user.roles
            .map((role) => role.name)
            .some((role) => rolesRoutes.includes(role));

        if (!roleExists) {
            return response.status(401).end();
        }

        return next();
    };
}