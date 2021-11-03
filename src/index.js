import app from './app';
import config from './config'
import "core-js/stable";
import "regenerator-runtime/runtime";

async function main(){
    await app.listen(config.port);
    console.log(`Aplicación hosteada en el puerto: ${config.port}`);
}

main();