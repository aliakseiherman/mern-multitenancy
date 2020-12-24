import { cors } from '../config.json';

function getOptions(): any {
  return {
    origin: function (origin, callback) {
      if (cors.whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
}

export { getOptions }