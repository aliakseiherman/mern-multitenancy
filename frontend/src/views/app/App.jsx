import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import './../../styles.css'
import axios from '../../helpers/axios-helper'
import { v4 as guid } from 'uuid'

import { DeleteCell } from '../../components/table-customization/cell/DeleteCell'
import { Table } from '../../components/table/Table'
import { OBJECT_PROPERTY_ABOUT, OBJECT_PROPERTY_NAME, SORT_DIRECTION_DESCENDING } from '../../components/table/constants'
import { TextAreaCell } from '../../components/table/cell/TextAreaCell'
import { Toastr } from '../../components/toastr/Toastr'
import { getSortByFn, paginate } from '../../helpers/array-helper'

import { addCarBrand, deleteCarBrand, setCarBrands } from '../../redux/car-brands/actions'

import { store, LOGOUT } from '../../redux/user/store'
import { getCarBrands } from '../../redux/car-brands/selectors'

const App = props => {
  const { carBrands, setCarBrands, addCarBrand, deleteCarBrand } = props

  const [tableGuid] = useState(guid())
  const [filterConfig, setFilterConfig] = useState(null)

  const getTableData = (filterConfig) => {

    if (!filterConfig) {
      return []
    }

    let carBrands2 = carBrands.sort(getSortByFn(filterConfig.columnName))

    if (!filterConfig.isAscending) {
      carBrands2 = carBrands.reverse()
    }

    return paginate(carBrands2, filterConfig.size, filterConfig.page)
  }

  const [tableData, setTableData] = useState(getTableData(filterConfig))

  const exit = () => {
    store.dispatch({ type: LOGOUT })
  }

  const create = () => {
    axios.post('/v1/car-brands', {
      name: name,
      about: about
    }).then((result) => {
      addCarBrand(result.data)
    })
  }

  useEffect(() => {
    axios.get('/v1/car-brands').then((result) => {
      setCarBrands(result.data)
    })
  }, [])

  useEffect(() => {
    setTableData(getTableData(filterConfig))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterConfig, carBrands])

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')

  return (
    <div style={{ maxWidth: '800px', padding: '10px' }}>

      <div style={{ marginBottom: '50px' }}>
        <button onClick={exit}>log out</button>
      </div>

      <div style={{ padding: '10px 5px', backgroundColor: 'gray', marginBottom: '70px' }}>
        <div><input placeholder={'enter name...'} value={name} onChange={(e) => { setName(e.target.value) }} /></div>
        <br />
        <div><textarea placeholder={'enter description...'} value={about} onChange={(e) => { setAbout(e.target.value) }} /></div>
        <br />
        <div>
          <button onClick={create}>add</button>
        </div>
      </div>

      <div>
        <Table
          guid={tableGuid}
          columns={[
            {
              name: 'Id',
              objectProperty: '_id',
              style: { flex: '0 0 40px' },
              isSortable: true
            }, {
              name: 'Car Brand',
              objectProperty: OBJECT_PROPERTY_NAME,
              style: { flex: '0 0 100px' },
              isSortable: true
            }, {
              name: 'About',
              objectProperty: OBJECT_PROPERTY_ABOUT,
              style: { flex: '7' },
              isSortable: true,
              template: TextAreaCell,
              onChange: (row) => {
                axios.put(`/v1/car-brands/${row._id}`, {
                  about: row.about
                }).then(() => {

                })
              }
            }, {
              style: { flex: '0 0 60px' },
              template: DeleteCell,
              onDelete: (row) => {
                axios.delete(`/v1/car-brands/${row._id}`, {
                  about: row.about
                }).then(() => {
                  axios.get('/v1/car-brands').then((result) => {
                    deleteCarBrand(row)
                  })
                })
              }
            }
          ]}
          defaultSize={10}
          defaultSortColumnName={'_id'}
          defaultSortDirection={SORT_DIRECTION_DESCENDING}
          setFilterConfig={setFilterConfig}
          filterConfig={filterConfig}
          data={tableData}
          totalCount={carBrands.length}
        ></Table>
      </div>

      <Toastr
        timeout={4000}
      ></Toastr>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    carBrands: getCarBrands(state)
  }
}

const mapDispatchToProps = { addCarBrand, deleteCarBrand, setCarBrands }

export default connect(mapStateToProps, mapDispatchToProps)(App)