import { defineConfig } from 'tsup'
import Unimport from 'unimport/unplugin'

export default defineConfig({
  entry: ['src/index.ts'],

  format: ['cjs'],

  esbuildPlugins: [
    Unimport.esbuild({
      dts: true,
      imports: [
        { name: 'default', as: 'consola', from: 'consola' },
        { name: 'default', as: 'fse', from: 'fs-extra' },
        { name: 'listen', from: 'listhen' },
        { name: 'defu', from: 'defu' },
        { name: 'getRandomPort', from: 'get-port-please' },
        { name: 'join', from: 'pathe' },
        { name: 'resolve', from: 'pathe' },
        { name: 'parseFilename', from: 'ufo' }
      ],
      dirs: [
        './src/types/*.ts',
        './src/utils/*.ts'
      ]
    })
  ]
})
