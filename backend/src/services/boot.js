import "module-alias/register.js";
import app from "../app.js";
import config from "../config/config.js";

export default (err) => {

  console.clear();

  if (err) {
    return console.log("Erro ao conectar ao banco de dados");
  }

  app.listen(config.app.port, (err) => {
    if (err) {
      return console.log('error')
    }
    console.log(`start http://localhost:${config.app.port}`)
  });
}