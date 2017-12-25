import React, { Component}  from 'react';
import matchSorter from 'match-sorter';
var value = (num) => (num/20);
export const colContabilidad = [{
  
    Header: 'Cuantía',
    accessor: 'amount',
    filterMethod: (filter, rows) =>
       matchSorter(rows, filter.value, { keys: ["amount"] }),
     filterAll: true,
    Cell: row => 
    (
      <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#dadada',
        borderRadius: '2px',
        position: 'relative'
      }}
    >
      <div
        style={{
          width: `${value(row.value)}%`,
          height: '100%',
          backgroundColor: row.value > 1500? '#85cc00'
            : row.value > 700 ? '#ffbf00'
            : '#ff2e00',
          borderRadius: '2px',
          transition: 'all .2s ease-out'
        }}
        
      >
        <p
          style={{
            position: 'absolute',
            margin: 'auto',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        dangerouslySetInnerHTML={{ __html: row.value + ' €'}} />
      </div>

    </div>
    ), // String-based value accessors!
    sortMethod: (a, b) => 
       (parseInt(a) > parseInt(b) ? 1 : -1)
  }, {
    Header: 'Fecha caja',
    accessor: 'fecha_caja',
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["fecha_caja"] }),
    filterAll: true,
    Cell: row => (
      row.value
    )
  }, {
    Header: 'Fecha inserción',
    accessor: 'fecha_insert',
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["fecha_insert"] }),
    filterAll: true,
    Cell: row => (
      row.value
    )
  }, {
    Header: 'Comentario', // Custom header components!
    accessor: 'comment',
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["comment"] }),
    filterAll: true,
    Cell: row => (
      row.value
    )
  }]