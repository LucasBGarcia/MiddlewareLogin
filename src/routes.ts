import { Router } from 'express'
import { LoginController } from './controllers/LoginController'
import { UserController } from './controllers/UserController'
import { BadRequestError } from './helpers/api-erros'
import { authMiddleware } from './middlewares/authMiddleware'


const routes = Router()

routes.get('/', (req, res) => {
    throw new BadRequestError('E-mail já existe')
    //throw new ApiError('Erro laçado no try', 400)
})

routes.post('/user', new UserController().create)
routes.post('/login', new LoginController().login)

routes.use(authMiddleware)
routes.get('/user', new UserController().index)
routes.get('/profile', new LoginController().getProfile)

export default routes