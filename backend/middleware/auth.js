var jwt = require('jsonwebtoken');

module.exports = {

  getUserId: (authorization) => {
    const token = authorization.split(' ')[1];
    if(token != null) {
      try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(decodedToken != null)
          userId = decodedToken.userId;
      } catch(error) { }
    }
    return userId;
  }
}