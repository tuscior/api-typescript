// import { Promise } from "mongoose";
import { NextFunction } from "express-serve-static-core";
import * as mongoose from 'mongoose'

const testData = { message: "Hello" }


export const controllers = {
    createOne(model: mongoose.Schema, body: Object) {
        return Promise.resolve(testData)
    },
    getOne(docToGet) {
        return Promise.resolve(testData)
    },
    getAll(model) {
        return Promise.resolve(testData)
    }
}


// export const createOne = model => (req: Request, res: Response, next: NextFunction) => {
//     return controllers.createOne(model, req.body)
//         .then(doc => res.json(doc))
//         .catch(error => next(error))
// }

export const updateOne = model => async (req: Request, res: Response, next: NextFunction) => {
    let docToUpdate = req

}

export const getAll = (model) => (req: Request, res: Response, next: NextFunction) => {
    return controllers.getAll(model)
      .then(docs => res.json(docs))
      .catch(error => next(error))
}

export const generateControllers = (model: any, overrides = {}) => {
    const defaults = {
        getAll: getAll(model)
    }
    return { ...defaults, ...overrides}
}