const main = async () => {
  const { port } = await setup()
  const app = createApp()
  const cors = defineCorsEventHandler({ origin: '*', methods: '*' })
  app.use(cors).use(router)
  listen(toNodeListener(app), { port, public: true })
}

main()
