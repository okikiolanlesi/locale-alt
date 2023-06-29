import redis from "redis";

class CacheMiddleware {
  client: any;
  constructor() {
    this.client = redis.createClient({
      url: "rediss://red-ciesm618g3n6jhl1eq4g:lhZdNVvVJ0MvlWObGwR0hHijQ53YMjAw@oregon-redis.render.com:6379",
    });
  }

  cache(req, res, next) {
    const key = req.originalUrl;
    this.client.get(key, (err, data) => {
      if (err) throw err;
      if (data !== null) {
        res.send(data);
      } else {
        next();
      }
    });
  }
}
