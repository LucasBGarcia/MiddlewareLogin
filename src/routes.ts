import { Router } from 'express'
import { LoginController } from './controllers/LoginController'
import { UserController } from './controllers/UserController'
import { BadRequestError } from './helpers/api-erros'


const routes = Router()

routes.get('/', (req, res) => {
    throw new BadRequestError('E-mail já existe')
    //throw new ApiError('Erro laçado no try', 400)
})

routes.post('/login', new LoginController().login)
routes.post('/usuario', new UserController().create)

//routes.use(authMiddleware)
routes.get('/usuario', new UserController().index)
routes.put('/usuario/:id', new UserController().update)
routes.delete('/usuario/:id', new UserController().delete)
routes.get('/profile', new LoginController().getProfile)

export default routes