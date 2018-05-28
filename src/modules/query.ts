// import { Promise } from "mongoose";
import { Request, Response, NextFunction } from "express-serve-static-core";
import { Document, Schema, Model, model} from "mongoose";

const testData = { message: "Hello World" }

export const controllers = {
    getAll(model: any) {
        return model.find({})
    },
    createOne(model: any, body: Object) {
        return model.create(body)
    },
    getOne(docToGet: any) {
        return Promise.resolve(docToGet)
    },
    updateOne(model: any, docToGet: any, update: Object) {
        return model.findOneAndUpdate({'slug': docToGet.slug}, update, {new: true})
    },
    deleteOne(docToGet: any) {
        return docToGet.remove()
    },
    findByParam(model: any, id: String) {
        return model.findById(id)
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
    .then(n=>{
        res.json(n)
    })
    .catch(e=>res.json(e))
//    docs.catch(er => res.json({m: er}))
}

export const getOne = (model: Schema) => async (req: any, res: Response, next: NextFunction): Promise<any> => {
   const doc = await controllers.getOne(req.docFromId)
   res.json(doc)
}

export const findByParam = (model: any) => async (req: any, res: Response, next: NextFunction, id: String): Promise<any> => {
    controllers.findByParam(model, id)
        .then(doc => {
            req.docFromId = doc
            next()
        })
        .catch(err => {
            next(new Error(err))
        })
}
export const updateOne = (model: any) => async (req: any, res: Response, next: NextFunction): Promise<any> => {
    let update = await controllers.updateOne(model, req.docFromId, req.body)
        .then(n => {
            res.json(n)
        })
        .catch(error => res.json(error))
}

export const deleteOne = (model: any) => async (req: any, res: Response, next: NextFunction): Promise<any> => {
   return controllers.deleteOne(req.docFromId)
        .then(empty => res.json(empty))
        .catch(err => res.json(err))
}

export const generateControllers = (model: any, overrides = {}) => {
    const defaults = {
        getAll: getAll(model),
        createOne: createOne(model),
        findByParam: findByParam(model),
        getOne: getOne(model),
        updateOne: updateOne(model),
        deleteOne: deleteOne(model)
    }
    return { ...defaults, ...overrides}
}