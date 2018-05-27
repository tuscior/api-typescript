import * as mongoose from 'mongoose'

export const removeModel = (modelName) => {
    const model = mongoose.model(modelName)
    return new Promise((resolve, reject) => {
      if (!model) {
        return resolve()
      }
      model.remove((err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

export const dropDb = () => {
    return mongoose.connect('mongodb://localhost/tes')
      .then(() => Promise.all(mongoose.modelNames().map(removeModel)))
  }