import { Request, Response } from 'express'
import path from 'path'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'
import { __dirname } from '../index.js'

class FilesController {
  async getFile(req: Request, res: Response) {
    const {fileName} = req.params
    const filePath = path.resolve(__dirname, '..', 'static', 'usersPages', `${fileName}`)
    return res.download(filePath, (err) => {
      if (err) {
          console.log(err)
          res.status(500).send('Could not download file')
      }
    })
  }

  async postFile(req: Request, res: Response) {
    try {
      const {pageTitle: webpageName, currentElements: myHtml} = req.body
      const filePath = path.resolve(__dirname, '..', 'static', 'index.html')
      const filePathCSS = path.resolve(__dirname, '..', 'static', 'style.css')
      let fileName = uuidv4() + ".html"
      if (!myHtml) return res.json('No elements.')
      if (!webpageName) return res.json('The page name is not specified.')
      let elementsHTML = ''
      myHtml.forEach(element => {
        elementsHTML += element.toString()
      })
      fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) return res.json('An error has occurred.')
        const txt = data.toString().replace(/\r\n/g, '').replace(/PagebuilderName/g, webpageName)
        const resultNoCSS = txt.replace(/PagebuilderElements/g, elementsHTML)
        fs.readFile(filePathCSS, 'utf-8', (err, data) => {
          if (err) return res.json('An error has occurred.')
          const finalResult = resultNoCSS.replace(/PagebuilderStyle/g, `<style>${data.toString()}</style>`)
          fs.writeFile(`${__dirname}/../static/usersPages/${fileName}`, finalResult, function(err) {
            if(err) {
              return console.log(err)
            }
            console.log('The file was saved!')
            return res.json({fileName})
          })
        })
      })
    }
    catch(err) {
      console.log(err)
    }
  }
}

export default new FilesController()
