const fs = require('fs')
const { logSuccess, logError } = require('./generic')
const { comment, black, bgWhite, bgRed, bgGreen } = require('./colorsVariables')

const configDataModule = (projectName) => {
    return configModule = {
        nome: projectName,
        inicio: Date(),
        subModules: {}
    }
}

const createConfigModuleFile = (configModule) => {
    return new Promise((resolve, reject) => {
        const param = JSON.stringify(configModule)
        fs.writeFile(`${configModule.nome}/tijucli-module.json`, param, (err) => {
            if (err) reject(logError(err));
            resolve(logSuccess('Configurações salvas!'))
        });
    }) 
}

const reWriteConfigModuleFile = (configModule) => {
    return new Promise((resolve, reject) => {
        const param = JSON.stringify(configModule)
        fs.writeFile(`tijucli-module.json`, JSON.stringify(configModule), (err) => {
            if (err) reject(logError(err));
            resolve(logSuccess('Configurações salvas!'))
        });
    }) 
}

const verifyConfigFile = () => {
    return new Promise((resolve, reject) => {
        fs.open('./tijucli-module.json', 'r', (err) => {
            if (err) {
                reject(err) 
            }else{
                resolve(true)
            }
        })
    })
}

const readConfigModuleFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(`tijucli-module.json`, (err, data) => {
            if (err) reject(logError(err));
            resolve(JSON.parse(data))
        });
    }) 
}

const addModuleInConfigFile = async (name) => {
    let dataConfig = await readConfigModuleFile()
    dataConfig.subModules[name] = new Date()
    
    reWriteConfigModuleFile(dataConfig)
}

module.exports = {
    createConfigModuleFile,
    verifyConfigFile,
    configDataModule,
    addModuleInConfigFile
}