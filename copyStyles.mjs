import fs from 'fs'
import {join} from 'node:path'


/**
 * use node's experimental fs.cpSync module for cross-platform support
 */
function copyStyles() {
  fs.mkdirSync(join('./','lib','css'),{recursive:true})
  
  // copy css files from tabulator-tables
  const sourceDirName = join('node_modules','tabulator-tables','dist','css')
  const destDirName = join('lib','css')
  
  // experimental cp (and cpSync) don't support relative paths
  const cwd = process.cwd()
  
  const sourcePath= join(cwd, sourceDirName)
  const destBasePath = join(cwd, 'lib')
  const destPath = join(cwd, destDirName)
  
  // works like cp -R
  fs.cpSync(sourcePath,destPath,{recursive: true})
  
  const srcStylesFileName = 'styles.css'
  const srcStylesFilePath = join(cwd,'src',srcStylesFileName)
  
  fs.copyFileSync(srcStylesFilePath, join(destBasePath,srcStylesFileName))
  fs.copyFileSync(srcStylesFilePath, join(destPath,srcStylesFileName))
}

copyStyles()
