import postOutbounds from '~/routes/outbounds/index.post'
import getOutbounds from '~/routes/outbounds/index.get'
import deleteOutbounds from '~/routes/outbounds/index.delete'
import patchOutbounds from '~/routes/outbounds/index.patch'
import getXrayProfile from '~/routes/xray-profiles/[id]/index.get'
import postSubscriptions from '~/routes/subscriptions/index.post'

export const router = createRouter()
  .post('/outbounds', postOutbounds)
  .get('/outbounds', getOutbounds)
  .delete('/outbounds', deleteOutbounds)
  .patch('/outbounds', patchOutbounds)
  .get('/xray-profiles/:id', getXrayProfile)
  .post('/subscriptions', postSubscriptions)
