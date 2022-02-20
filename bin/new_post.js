import fs from 'fs'

const today = new Date()
const genPath = `posts/${today.toFormat('YYYY/MM')}`
const fileName = `${today.toFormat('DD')}-${process.argv[2]}.md`

const frontMatter = `---
title: ${process.argv[2]}
date: '${today.toFormat('YYYY-MM-DD')}'
archives: ["${today.toFormat('YYYY/MM')}"]
categories:
  -
tags:
  -
image: /images/
---
`

if (!fs.existsSync(genPath)) {
  fs.mkdirSync(genPath)
}

fs.writeFile(`${genPath}/${fileName}`, frontMatter, (err, data) => {
  if (err) console.log(err)
  else console.log('generated')
})
