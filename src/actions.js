import fetch from 'node-fetch'

export const FETCH_SUCCESS= 'FETCH_SUCCESS'
export const fetchSuccess = payload => ({
  type: FETCH_SUCCESS,
  payload
})

export const FETCH_FAILIRE = 'FETCH_FAILIRE'
export const fetchFailure = payload => ({
  type: FETCH_FAILIRE,
  payload
})

export const fetchArticle = (site, slug) => async dispatch => {
  if (!site || !slug) return
  try {
    const response = await fetch(`http://${site}.local:8000/api/articles/${slug}`)
    const data = await response.json()
    dispatch(fetchSuccess(data))
  } catch (err) {
    dispatch(fetchFailure(err))
  }
}