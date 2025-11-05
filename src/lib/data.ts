// export async function getData() {
//   const res = await fetch('https://external-service.com/data', {
//     headers: {
//       authorization: process.env.API_KEY,
//     },
//   })
 
//   return res.json()
// }
import 'server-only'
 
export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  })
 
  return res.json()
}