const main = async () => {
  const { port } = await setup()
  const app = createApp()
  app.use(router)

  listen(toNodeListener(app), { port })
}

main()
