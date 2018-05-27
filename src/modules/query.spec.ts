import { expect } from 'chai'
import { dropDb } from '../tests/helper'
import { controllers } from './query'
import Post from '../models/Post'

describe('Modules', () => {
  beforeEach(async () => {
    await dropDb()
  })

  afterEach(async () => {
    await dropDb()
  })

  describe('query', () => {
    describe('createOne', () => {
      it('should create a document', async () => {
        const result = await controllers.createOne(Post, {
            "title": "this is the title",
            "slug": "slug11",
            "content": "content please"
        })
        expect(result).to.be.ok
        expect(result.title).to.equal('this is the title')
      })
    })

    describe('getOne', () => {
      it('should get one', async () => {
        const result = await controllers.createOne(Post, {
            "title": "This is the title",
            "slug": "slug1",
            "content": "content please"
        })
        const found = await controllers.getOne(result)
        expect(found).to.equal(result)
      })
    })

    // describe('updateOne', () => {
    //     it('should update one', async () => {
    //       const result = await controllers.createOne(Post, {
    //           "title": "This is the title",
    //           "slug": "slug1",
    //           "content": "content please"
    //       })
    //       const found = await controllers.getOne(result)
    //       expect(found).to.equal(result)
    //     })
    //   })

    // describe('deleteOne', () => {
    //     it('should delete one', async () => {
    //       const result = await controllers.createOne(Post, {
    //           "title": "This is the title",
    //           "slug": "slug1",
    //           "content": "content please"
    //       })
    //       const found = await controllers.getOne(result)
    //       expect(found).to.equal(result)
    //     })
    //   })

    describe('findByParams', () => {
        it('should find doc by id', async () => {
          const result = await controllers.createOne(Post, {
              "title": "This is the title",
              "slug": "slug1",
              "content": "content please"
          })
          const found = await controllers.getOne(result)
          expect(found).to.equal(result)
        })
     })

    describe('getAll', () => {
        it('should get all', async () => {
          let slugs = ['slug1', 'slug2', 'slug3']
          const posts = await Promise.all(slugs.map(async slug => {
              let post = await controllers.createOne(Post, {
                    "title": "This is the title",
                    "slug": slug,
                    "content": "Test content"
                })
                return post.toJSON()
              }))
        const allPosts = (await controllers.getAll(Post))
            .map(post => post.toJSON())
  
          expect(allPosts).to.have.length(posts.length)
        })
      })
  })
})