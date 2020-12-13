export default function (_context, inject) {
  const appId = '8DAUXPT4M7'
  const apiKey = '14863c0250f392e9df9b240257d24c28'

  inject('dataApi', {
    getHome,
  })

  async function getHome(homeId) {
    const response = await fetch(
      `https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
      {
        headers: {
          'X-Algolia-API-Key': apiKey,
          'X-Algolia-Application-Id': appId,
        },
      }
    )
    const json = await response.json()
    return json
  }
}
