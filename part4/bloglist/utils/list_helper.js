const dummy = (blogs) => {
    return (1)
  }

const totalLikes = (blogs)=>{
  return(
    blogs.reduce((acc, blog) => acc + blog.likes, 0)
  )
}
  
const favoriteBlog = (blogs)=>{
  return(
    blogs.reduce((acc, blog) => {
      if (blog.likes > acc.likes) {
        return blog;
      } else {
        return acc;
      }
    })
  )
}

const mostBlogs = (blogs)=>{
    const counts = {}
  
    for (const blog of blogs) {
      if (counts[blog.author] === undefined) {
        counts[blog.author] = 1
      } else {
        counts[blog.author] += 1
      }
    }
  
    let mostRepeatedAuthor = null
    let maxCount = 0
    for (const author in counts) {
      if (counts[author] > maxCount) {
        mostRepeatedAuthor = author
        maxCount = counts[author]
      }
    }
  
    return maxCount
  }

  const mostLikes = (blogs)=>{
    const counts = {}
  
    for (const blog of blogs) {
      if (counts[blog.author] === undefined) {
        counts[blog.author] = blog.likes
      } else {
        counts[blog.author] += blog.likes
      }
    }
  
    let mostLikedAuthor = null
    let maxCount = 0
    for (const author in counts) {
      if (counts[author] > maxCount) {
        mostLikedAuthor = author
        maxCount = counts[author]
      }
    }
  
    return {author:mostLikedAuthor, likes:maxCount}
  }  


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }