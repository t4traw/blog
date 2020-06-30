const fs = require('fs')
require('date-utils')

const today = new Date()
const genPath = `content/${today.toFormat('YYYY/MM')}`
const fileName = `${today.toFormat('DD')}-${process.argv[2]}.md`

const frontMatter = `---
title: ${process.argv[2]}
date: ${today.toFormat('YYYY-MM-DD')}
archives: ["${today.toFormat('YYYY/MM')}"]
categories:
  -
tags:
  -
image: /images/
---
`

fs.writeFile(`${genPath}/${fileName}`, frontMatter, (err, data) => {
  if (err) console.log(err)
  else console.log('generated')
})
