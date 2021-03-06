import { GENERATE_BASE_URL } from '../constants'

export const REQUEST_BLOCK = 'REQUEST_BLOCK'
export const requestBlock = indexOrHash => dispatch => {
  dispatch({
    type: REQUEST_BLOCK,
    indexOrHash,
  })
}

export const REQUEST_BLOCKS = 'REQUEST_BLOCKS'
export const requestBlocks = page => dispatch => {
  dispatch({
    type: REQUEST_BLOCKS,
    page,
  })
}

export const REQUEST_BLOCK_SUCCESS = 'REQUEST_BLOCK_SUCCESS'
export const requestBlockSuccess = (blockHeight, json) => dispatch => {
  dispatch({
    type: REQUEST_BLOCK_SUCCESS,
    blockHeight,
    json,
    receivedAt: Date.now(),
  })
}

export const REQUEST_BLOCKS_SUCCESS = 'REQUEST_BLOCKS_SUCCESS'
export const requestBlocksSuccess = (page, json) => dispatch => {
  dispatch({
    type: REQUEST_BLOCKS_SUCCESS,
    page,
    json,
    receivedAt: Date.now(),
  })
}

export const REQUEST_BLOCK_ERROR = 'REQUEST_BLOCK_ERROR'
export const requestBlockError = (blockHeight, error) => dispatch => {
  dispatch({
    type: REQUEST_BLOCK_ERROR,
    blockHeight,
    error,
    receivedAt: Date.now(),
  })
}

export const REQUEST_BLOCKS_ERROR = 'REQUEST_BLOCKS_ERROR'
export const requestBlocksError = (page, error) => dispatch => {
  dispatch({
    type: REQUEST_BLOCKS_ERROR,
    page,
    error,
    receivedAt: Date.now(),
  })
}

export function shouldFetchBlock(state, index) {
  const block = state.blocks.cached[index]
  if (!block) {
    return true
  } else if (state.blocks.isLoading) {
    return false
  }
  return false
}

export function fetchBlock(indexOrHash = 1) {
  return async (dispatch, getState) => {
    if (shouldFetchBlock(getState(), indexOrHash)) {
      dispatch(requestBlock(indexOrHash))
      try {
        const response = await fetch(
          `${GENERATE_BASE_URL()}/get_block/${indexOrHash}`,
        )
        const json = await response.json()
        dispatch(requestBlockSuccess(indexOrHash, json))
      } catch (e) {
        dispatch(requestBlockError(indexOrHash, e))
      }
    }
  }
}

export function fetchBlocks(page = 1) {
  return async (dispatch, getState) => {
    try {
      dispatch(requestBlocks(page))
      const response = await fetch(`${GENERATE_BASE_URL()}/get_blocks/${page}`)
      const json = await response.json()
      dispatch(requestBlocksSuccess(page, json))
    } catch (e) {
      dispatch(requestBlockError(page, e))
    }
  }
}
