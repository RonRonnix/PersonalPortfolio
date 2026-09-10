import { readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const imageDirectory = path.resolve('src/assets/images')
const sourceExtensions = new Set(['.jpg', '.jpeg', '.png'])
const files = await readdir(imageDirectory)

await Promise.all(
  files
    .filter((file) => sourceExtensions.has(path.extname(file).toLowerCase()))
    .map(async (file) => {
      const sourcePath = path.join(imageDirectory, file)
      const outputPath = path.join(imageDirectory, `${path.basename(file, path.extname(file))}.webp`)

      await sharp(sourcePath)
        .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 82, effort: 5 })
        .toFile(outputPath)

      console.log(`Optimized ${file} -> ${path.basename(outputPath)}`)
    })
)
