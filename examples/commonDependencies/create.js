const fs = require('fs')
const common = require('./config').common

const createFile = async function(){
  let masterRegisterContent = ''
  common.forEach(item=>{
    masterRegisterContent+=`window.${item}=require('${item}');`
  })
  fs.writeFile(__dirname + "/masterRegister.js", masterRegisterContent, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });
  
  let appWebpackMergeObject = {
    resolve: {
      alias: {
      }
    }
  }
  
  common.forEach(item=>{
    appWebpackMergeObject.resolve.alias[item] = `${__dirname}/appWebpackAlias/${item}`
  })
  
  
  fs.writeFile(__dirname + "/appWebpackMerge.js", `module.exports=${JSON.stringify(appWebpackMergeObject)}`, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
  });
  const hasDir = await fs.existsSync(`${__dirname}/appWebpackAlias`)

  async function deleteFolder(path) {
    let files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(async function(file,index){
            let curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) {
              deleteFolder(curPath);
            } else {
              fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
  }
  if(hasDir){
    await deleteFolder(`${__dirname}/appWebpackAlias`)
  }
  await fs.mkdirSync(`${__dirname}/appWebpackAlias`)

  common.forEach(item=>{
    let aliasContent = `module.exports=window.${item}`
    fs.writeFile(`${__dirname}/appWebpackAlias/${item}.js`, aliasContent, function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    });
  })  
}

createFile()