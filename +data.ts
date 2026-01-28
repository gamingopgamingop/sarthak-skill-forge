// @ts-ignore
// @ts-nocheck
import { dataEndpointUrl } from './+dataEndpointUrl.js'
export { data }
 
import fetch from 'node-fetch'
 
async function data(pageContext) {
  // The value exported by /pages/countries/+dataEndpointUrl.js is
  // available at pageContext.config.dataEndpointUrl
  const response = await fetch(pageContext.config.dataEndpointUrl)
  // ...
}
