import postOutbounds from '~/routes/outbounds/index.post'
import getOutbounds from '~/routes/outbounds/index.get'
import deleteOutbounds from '~/routes/outbounds/index.delete'
import patchOutbounds from '~/routes/outbounds/index.patch'

export const router = createRouter()
  .post('/outbounds', postOutbounds)
  .get('/outbounds', getOutbounds)
  .delete('/outbounds', deleteOutbounds)
  .patch('/outbounds', patchOutbounds)
