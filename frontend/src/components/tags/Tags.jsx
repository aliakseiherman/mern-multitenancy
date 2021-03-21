import React, { useEffect, useState } from 'react'
import { AutoComplete } from './AutoComplete'
import { Tag } from './Tag'

import '../../assets/styles/feasible-ui.css'

export const Tags = (props) => {

  const {
    parentContainerRef,
    onTagAdded: handleTagAdded,
    onTagRemoved: handleTagRemoved,
    getTags,
    isConfirmOnDelete
  } = props

  const [isSearchVisible, setIsSearchVisible] = useState(false)
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    setSelectedTags(props.selectedTags)
  }, [props.selectedTags])

  const handleEnterPressed = (tagName) => {
    handleTagAdded({ name: tagName })
  }

  const handleTagSelected = (tag) => {
    handleTagAdded(tag)
  }

  const handleTagUnselected = (tag) => {
    handleTagRemoved(tag)
  }

  const handleClick = () => {
    setIsSearchVisible(true)
  }

  const getUnselectedItems = () => {
    return getTags().filter((tag) => {
      let isUnselected = true

      selectedTags.forEach((selectedItem) => {
        if (selectedItem.name === tag.name) {
          isUnselected = false
        }
      })

      return isUnselected
    })
  }

  return (
    <div className='tags-container'>

      {selectedTags.map((selectedTag, i) => (
        <Tag
          tag={selectedTag}
          onItemUnselected={handleTagUnselected}
          parentContainerRef={parentContainerRef}
          isConfirmOnDelete={isConfirmOnDelete}
          key={i}
        ></Tag>
      ))}

      {isSearchVisible && (
        <AutoComplete
          items={getUnselectedItems()}
          onItemSelected={handleTagSelected}
          onEnterPressed={handleEnterPressed}
          setIsSearchVisible={setIsSearchVisible}
          parentContainerRef={parentContainerRef}
        ></AutoComplete>
      )}

      {!isSearchVisible && (
        <div className='button primary add-tag-button' onClick={handleClick}>
          <span>add</span>
        </div>
      )}

    </div>
  )
}