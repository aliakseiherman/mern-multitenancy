export const getSortByFn = (propertyName) => {

  const sortByStringFn = (a, b) => {
    if (a[propertyName] < b[propertyName]) { return -1 }
    if (a[propertyName] > b[propertyName]) { return 1 }
    return 0
  }

  return sortByStringFn
}

export const paginate = (array, page_size, page_number) => array.slice((page_number - 1) * page_size, page_number * page_size)