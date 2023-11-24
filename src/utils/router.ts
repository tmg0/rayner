import postOutbounds from '~/routes/outbounds/index.post'
import getOutbounds from '~/routes/outbounds/index.get'
import deleteOutbounds from '~/routes/outbounds/index.delete'
import patchOutbounds from '~/routes/outbounds/index.patch'
import getXrayProfile from '~/routes/xray-profiles/[id]/index.get'
import getSubscriptions from '~/routes/subscriptions/index.get'
import postSubscriptions from '~/routes/subscriptions/index.post'
import shutdownPost from '~/routes/shutdown.post'

export const router = createRouter()
  .get('/', eventHandler(() => ({})))
  .post('/shutdown', shutdownPost)
  .post('/outbounds', postOutbounds)
  .get('/outbounds', getOutbounds)
  .delete('/outbounds', deleteOutbounds)
  .patch('/outbounds', patchOutbounds)
  .get('/xray-profiles/:id', getXrayProfile)
  .get('/subscriptions', getSubscriptions)
  .post('/subscriptions', postSubscriptions)
