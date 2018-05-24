// import { Promise } from "mongoose";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { Document, Schema, Model, model} from "mongoose";

const testData = { message: "Hello" }

export const controllers = {
    createOne(model: any, body: Object) {
        return model.create(body)
    },
    getOne(model: any, docToGet: string) {
        return model.findOne({'slug': docToGet})
    },
    getAll(model: any) {
        return model.find({})
    }
}

export const createOne = (model: any) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    let docToUpdate = req.body
    const doc = await controllers.createOne(model, docToUpdate)
    if(doc) {
        res.json({m: 'created mate'})
    }
}

export const getAll = (model: Schema) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   controllers.getAll(model)
    .then(n=>res.json(n))
    .catch(e=>res.json(e))
//    docs.catch(er => res.json({m: er}))
}

export const getOne = (model: Schema) => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
   const doc = await controllers.getOne(model, req.params.id)
}

export const generateControllers = (model: any, overrides = {}) => {
    const defaults = {
        getAll: getAll(model),
        createOne: createOne(model)
    }
    return { ...defaults, ...overrides}
}