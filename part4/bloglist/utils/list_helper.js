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

  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }