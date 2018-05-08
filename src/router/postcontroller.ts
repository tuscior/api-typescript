import * as query from '../modules/query'
import Post from '../models/Post'

const postController = query.generateControllers(Post)
export default postController