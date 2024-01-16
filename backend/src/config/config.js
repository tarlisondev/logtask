import "dotenv/config";

export default {
  app: {
    port: process.env.PORT || 4000
  },
  db: {
    connectToString: process.env.MONGO_DB
  },
  jwt: {
    secret: process.env.SECRET
  }
}
