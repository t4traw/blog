import fs from 'fs'

const listFilePaths = (dir: string): string[] => {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((dirent) => (dirent.isFile() ? [`/${dir}/${dirent.name}`] : listFilePaths(`/${dir}/${dirent.name}`)))
}

export default listFilePaths
