const { classList } = require('../../handlers/class');

module.exports = [
  {
    path: '/api/classes',
    method: 'get',
    handler: classList,
    secure: true,
  }
]
