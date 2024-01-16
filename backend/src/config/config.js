import "dotenv/config";

export default {
  app: {
    port: process.env.PORT || 3333
  },
  db: {
    connectToString: process.env.MONGO_DB
  },
  jwt: {
    secret: process.env.SECRET
  },
  web: {
    link: process.env.LINK_WEB
  }
}
