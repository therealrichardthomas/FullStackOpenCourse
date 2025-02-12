

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (array) => {

  return array.reduce((total, blog) => {
    return total + blog.likes
  }, 0)

}

const favoriteBlog = (array) => {

  return array.reduce((mostLiked, blog) => {
    return mostLiked.likes > blog.likes ? mostLiked : blog
  }, array[0])

}

module.exports = { dummy, totalLikes, favoriteBlog }