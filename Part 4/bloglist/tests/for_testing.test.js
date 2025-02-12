
const { test, describe} = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helpers')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

  test('when list with one blog, equal the likes of that blog', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmfu',
      author: 'Edsger W. Dijkstr',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pd',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Go To Statement Considered Harmf',
      author: 'Edsger W. Dijkst',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.p',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f6',
      title: 'Go To Statement Considered Harm',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.',
      likes: 33,
      __v: 0
    }
  ]

  test('of a bigger list when calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 50)
  })
})

describe('most liked', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when only one blog is passed', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    assert.deepStrictEqual(result, listWithOneBlog[0])
  })

  test('when there is no array', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepStrictEqual(result, undefined)
  })

  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Go To Statement Considered Harmfu',
      author: 'Edsger W. Dijkstr',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pd',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f7',
      title: 'Go To Statement Considered Harmf',
      author: 'Edsger W. Dijkst',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.p',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f6',
      title: 'Go To Statement Considered Harm',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.',
      likes: 33,
      __v: 0
    }
  ]

  test('when there are multiple blogs', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[3])
  })

  test('when there are multiple same likes', () => {
    blogs.push({
      _id: '5a422aa71b54a676234d17f3',
      title: 'hehe',
      author: 'Edsger hehe',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/hehe.',
      likes: 33,
      __v: 0
    })

    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[4])
  })
})