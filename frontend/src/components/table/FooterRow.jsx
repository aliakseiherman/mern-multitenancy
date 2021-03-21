import React, { useState } from 'react'
import store from './store'
import { EVENT_PAGE_CHANGED, EVENT_SIZE_CHANGED } from './constants'
import { Button } from '../button/Button'
import { Select } from '../select/Select'
import { useEffect } from 'react'

export const FooterRow = (props) => {

  const {
    totalCount,
    footer,
    tableContainerRef
  } = props

  const pageSize5 = { name: '5', value: 5 }
  const pageSize10 = { name: '10', value: 10 }
  const pageSize25 = { name: '25', value: 25 }
  const pageSize50 = { name: '50', value: 50 }
  const pageSize100 = { name: '100', value: 100 }
  const pageSize250 = { name: '250', value: 250 }
  const pageSize500 = { name: '500', value: 500 }

  const _pageSizes = [pageSize5, pageSize10, pageSize25, pageSize50, pageSize100, pageSize250, pageSize500]

  const [pageSizes] = useState(_pageSizes)

  const [size, setSize] = useState(pageSizes.filter(s => s.value === props.size)[0])
  const [pageNumber, setPageNumber] = useState()
  const [pageNumbers, setPageNumbers] = useState([])

  const setSizeForParent = (size) => {
    setSize(size)

    store.dispatch({ type: EVENT_SIZE_CHANGED, tableGuid: props.tableGuid, size: size.value })
  }

  const getNumberOfPages = () => {
    let number = Math.ceil(totalCount / size.value)
    return number > 0 ? number : 1
  }

  const setPage = (page) => {
    if (page.value < 1 || page.value > getNumberOfPages()) return
    setPageNumber(page)
    store.dispatch({ type: EVENT_PAGE_CHANGED, tableGuid: props.tableGuid, number: page.value })
  }

  useEffect(() => {
    let _pageNumbers = []
    for (let i = 1;i <= getNumberOfPages();i++) {
      _pageNumbers.push({ name: i.toString(), value: i })
    }
    setPageNumbers(_pageNumbers)
    setPage(_pageNumbers[0])

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, size])

  const next = () => {
    pageNumber.value > 1 &&
      setPage(pageNumbers.filter(pn => pn.value === pageNumber.value - 1)[0])
  }

  const prev = () => {
    pageNumber.value < getNumberOfPages() &&
      setPage(pageNumbers.filter(pn => pn.value === pageNumber.value + 1)[0])
  }

  const first = () => {
    setPage(pageNumbers.filter(pn => pn.value === 1)[0])
  }

  const last = () => {
    setPage(pageNumbers.filter(pn => pn.value === getNumberOfPages())[0])
  }

  return (
    <React.Fragment>
      <div
        className='footer-row'
      >

        {footer && footer.cells && footer.cells.map((descriptor, i) => (
          <React.Fragment key={i}>
            <div className='footer-cell'>
              <descriptor.component
                descriptor={descriptor}
                tableContainerRef={tableContainerRef}
              ></descriptor.component>
            </div>
          </React.Fragment>
        ))}

        <div className='footer-cell footer-cell-spacer'></div>

        <div className='footer-cell footer-cell-paging'>
          {getNumberOfPages() > 0 &&
            <React.Fragment>
              <span className='label mr5'>page</span>
              <Select
                items={pageNumbers}
                selectedItem={pageNumber}
                setSelectedItem={(page) => {
                  setPage(page)
                }}
                hasSearch={true}
                parentContainerRef={tableContainerRef}
              ></Select>
              <span className='label'>of</span>
              <span className='label ml5 mr5'>{getNumberOfPages()}</span>
              {getNumberOfPages() > 1 &&
                <React.Fragment>
                  <Button
                    label={'«'}
                    onClick={first}
                  ></Button>
                  <Button
                    label={'‹'}
                    onClick={next}
                  ></Button>
                  <Button
                    label={'›'}
                    onClick={prev}
                  ></Button>
                  <Button
                    label={'»'}
                    onClick={last}
                  ></Button>
                </React.Fragment>
              }
            </React.Fragment>
          }
        </div>

        <div className='footer-cell footer-cell-paging'>
          <span className='label mr5'>size</span>
          <Select
            items={pageSizes}
            selectedItem={size}
            setSelectedItem={(size) => {
              setSizeForParent(size)
            }}
            parentContainerRef={tableContainerRef}
          ></Select>
        </div>
      </div>

      {footer && footer.auxilliaryRows && footer.auxilliaryRows.map((descriptor, i) => (
        <React.Fragment key={i}>
          <descriptor.component
            descriptor={descriptor}
            tableContainerRef={tableContainerRef}
          ></descriptor.component>
        </React.Fragment>
      ))}

    </React.Fragment>
  )
}