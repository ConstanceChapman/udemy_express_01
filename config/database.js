if(process.env.NODE_ENV === 'production') {
  module.exports = {
    mongoURI: 'mongodb://connie:connie1@ds113586.mlab.com:13586/udemy01-vidjot-prod'
  }
} else {
  module.exports = {
    mongoURI: 'mongodb://localhost/vidjot-dev'
  }
}
