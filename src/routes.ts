import { Router } from 'express'
import { LoginController } from './controllers/LoginController'
import { UserController } from './controllers/UserController'
import { BadRequestError } from './helpers/api-erros'
import { RoleController } from './controllers/RoleController'
import { authMiddleware } from './middlewares/authMiddleware'


const routes = Router()

routes.get('/', (req, res) => {
    throw new BadRequestError('E-mail já existe')
    //throw new ApiError('Erro laçado no try', 400)
})

routes.post('/login', new LoginController().login)
routes.post('/usuario', new UserController().create)

// routes.use(authMiddleware)
routes.get('/usuario', new UserController().index)
routes.put('/usuario/:id', new UserController().update)
routes.delete('/usuario/:id', new UserController().delete)
routes.get('/profile', new LoginController().getProfile)

routes.post('/role', new RoleController().create)
routes.get('/role', new RoleController().index)
routes.put('/role/:id', new RoleController().update)
routes.delete('/role/:id', new RoleController().delete)

export default routes