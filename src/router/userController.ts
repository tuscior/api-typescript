import * as query from '../modules/query'
import User from '../models/User'

const userController = query.generateControllers(User)

export default userController