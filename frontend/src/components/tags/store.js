import { createStore, combineReducers } from 'redux'
import { EVENT_UPDATE_TAGS, EVENT_UPDATE_BOOKMARKED_PHRASES_LIST, EVENT_UPDATE_BOOKMARKED_ENTRIES_LIST, EVENT_UPDATE_BOOKMARKED_DEFINITIONS_LIST, EVENT_UPDATE_DICTIONARIES, EVENT_UPDATE_PHRASEBOOKS } from './constants'

function data(state = {}, action) {
  switch (action.type) {
    case EVENT_UPDATE_TAGS:
      state.type = action.type
      state.tags = action.tags
      return state
    case EVENT_UPDATE_BOOKMARKED_ENTRIES_LIST:
      state.type = action.type
      state.bookmarkedEntriesLists = action.bookmarkedEntriesLists
      return state
    case EVENT_UPDATE_BOOKMARKED_DEFINITIONS_LIST:
      state.type = action.type
      state.bookmarkedDefinitionsLists = action.bookmarkedDefinitionsLists
      return state
    case EVENT_UPDATE_BOOKMARKED_PHRASES_LIST:
      state.type = action.type
      state.bookmarkedPhrasesLists = action.bookmarkedPhrasesLists
      return state
    case EVENT_UPDATE_DICTIONARIES:
      state.type = action.type
      state.dictionaries = action.dictionaries
      return state
    case EVENT_UPDATE_PHRASEBOOKS:
      state.type = action.type
      state.phrasebooks = action.phrasebooks
      return state
    default:
      return state
  }
}

const reducer = combineReducers({ data })

const store = createStore(reducer)

export default store