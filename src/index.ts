import { createApp, toNodeListener } from 'h3'

(async () => {
  const { port } = await setup()
  const app = createApp()
  listen(toNodeListener(app), { port })
})()
