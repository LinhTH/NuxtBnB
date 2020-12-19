export default function (_context, inject) {
  const appId = '8DAUXPT4M7'
  const apiKey = '14863c0250f392e9df9b240257d24c28'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  inject('dataApi', {
    getHome,
    getReviewsByHomeId,
  })

  async function getHome(homeId) {
    try {
      return unwrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`,
          {
            headers,
          }
        )
      )
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getReviewsByHomeId(homeId) {
    try {
      return unwrap(
        await fetch(
          `https://${appId}-dsn.algolia.net/1/indexes/reviews/query`,
          {
            headers,
            method: 'POST',
            body: JSON.stringify({
              filters: `homeId:${homeId}`,
              hitsPerPage: 6,
              attributesToHighlight: [],
            }),
          }
        )
      )
    } catch (error) {
      return getErrorResponse(error)
    }
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

  function getErrorResponse(error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {},
    }
  }
}
