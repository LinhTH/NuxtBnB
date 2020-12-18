export default function (_context, inject) {
  const appId = '8DAUXPT4M7'
  const apiKey = '14863c0250f392e9df9b240257d24c28'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  inject('dataApi', {
    getHome,
  })

  async function getHome(homeId) {
    return unwrap(
      await fetch(
        `https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
        {
          headers,
        }
      )
    )
  }

  async function unwrap(response) {
    const json = await response.json()
    const { ok, status, statusText } = response
    return {
      json,
      ok,
      status,
      statusText,
    }
  }
}
