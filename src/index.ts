const main = async () => {
  const { port } = await setup()
  const app = createApp()
  const cors = defineCorsEventHandler({ origin: '*' })
  app.use(cors).use(router)
  listen(toNodeListener(app), { port })
}

main()
