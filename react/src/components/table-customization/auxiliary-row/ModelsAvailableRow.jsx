import React from 'react';
import { getRowClass } from 'feasible-ui';

export const ModelsAvailableRow = (props) => {

  const {
    data,
    columns,
    auxiliaryRow,
    settings,
    descriptor,
    updateRow,
    dataRowsContainerRef: parentContainerRef
  } = props;

  const cssClass = getRowClass(settings, 'row');

  const cars = data.modelsAvailable;

  return (
    <React.Fragment>
      {cars &&
        <React.Fragment>
          <div className={cssClass}>
            <div className='sub-table-container'>
              <div className='sub-table-padding'></div>
              <div className='sub-table-rows-container'>

                <div className='sub-table-heading'>Available cars:</div>

                <div className={'sub-table-header-row'}>

                  <div
                    className='header-cell sub-table-header-cell'
                    style={{ flex: '1' }}
                  >
                    <span>Name</span>
                  </div>

                  <div
                    className='header-cell sub-table-header-cell'
                    style={{ flex: '1' }}
                  >
                    <span>Engine</span>
                  </div>

                  <div
                    className='header-cell sub-table-header-cell'
                    style={{ flex: '1' }}
                  >
                    <span>Capacity</span>
                  </div>

                  <div
                    className='header-cell sub-table-header-cell'
                    style={{ flex: '1' }}
                  >
                    <span>Power</span>
                  </div>

                  <div
                    className='header-cell sub-table-header-cell'
                    style={{ flex: '1' }}
                  >
                    <span>Gearbox</span>
                  </div>

                  <div
                    className='header-cell sub-table-header-cell'
                    style={{ flex: '1' }}
                  >
                    <span>Color</span>
                  </div>

                </div>

                {cars.map((car, i) => (
                  <div
                    className={cssClass + ' sub-table-row'}
                    key={i}
                  >

                    <div
                      className='cell'
                      style={{ flex: '1' }}
                    >
                      {car.name}
                    </div>

                    <div
                      className='cell'
                      style={{ flex: '1' }}
                    >
                      {car.engine}
                    </div>

                    <div
                      className='cell'
                      style={{ flex: '1' }}
                    >
                      {car.capacity}
                    </div>

                    <div
                      className='cell'
                      style={{ flex: '1' }}
                    >
                      {car.power}
                    </div>

                    <div
                      className='cell'
                      style={{ flex: '1' }}
                    >
                      {car.gearbox}
                    </div>

                    <div
                      className='cell'
                      style={{ flex: '1' }}
                    >
                      {car.color}
                    </div>

                  </div>
                ))}

              </div>
            </div>
          </div>
        </React.Fragment>
      }
    </React.Fragment>
  )
}