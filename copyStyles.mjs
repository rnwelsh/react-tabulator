import {mkdirSync, readdir, copyFileSync} from 'node:fs'
import {join, extname} from 'node:path'


/**
 * use fs for cross-platform support
 */
function copyStyles() {
  mkdirSync(join('./','lib','css'),{recursive:true})
  
  // copy css files directly from node_modules/tabulator-tables
  
  const cwd = process.cwd()

  const sourcePath    = join(cwd, 'node_modules','tabulator-tables','dist','css')
  const destBasePath  = join(cwd, 'lib')
  const destCssDirPath= join(cwd, 'lib','css')
  
  readdir(sourcePath, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      // copy only css files
      if(extname(file)==='.css') {
        copyFileSync(join(sourcePath,file), join(destCssDirPath,file))
      }
    }
  });
  
  const srcStylesFileName = 'styles.css'
  const srcStylesFilePath = join(cwd,'src',srcStylesFileName)
  
  copyFileSync(srcStylesFilePath, join(destBasePath  ,srcStylesFileName))
  copyFileSync(srcStylesFilePath, join(destCssDirPath,srcStylesFileName))
}

copyStyles()
