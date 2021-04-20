var jwt = require('jsonwebtoken');

module.exports = {

  getUserId: (authorization) => {
    var userId = -1;
    var token = (authorization != null) ? authorization.replace('Bearer ', '') : null;
    if(token != null) {
      try {
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        if(decodedToken != null)
          userId = decodedToken.userId;
      } catch(error) { }
    }
    return userId;
  }
}