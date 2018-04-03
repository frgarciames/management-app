import React, { Component}  from 'react';
import matchSorter from 'match-sorter';
import {MdDelete} from 'react-icons/lib/md';
import {deleteCaja} from '../../services/services'
import moment from 'moment-with-locales-es6'

var value = (num) => (num/20);
export const colFacturas = [
  {
    Header: '', // Custom header components!
    accessor: 'id',
    width: 50,
    Cell: row => (
      <MdDelete fontSize='1.5em' cursor='pointer' value={row.value} onClick={() => this.props.openModal(row.value)}/>
    )
  },
  {
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
       (parseInt(a) > parseInt(b) ? 1 : -1),
    minWidth: 120
  },{
    Header: 'Proveedor',
    accessor: 'provider',
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["provider.name"] }),
    filterAll: true,
    Cell: row => (
      row.value.name
    ),
    minWidth: 140
  },
   {
    Header: 'Fecha factura',
    accessor: 'fecha_factura',
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["fecha_factura"] }),
    filterAll: true,
    Cell: row => (
      row.value
    ),
    sortMethod: (a, b) => 
    (parseInt(moment(a).day()) > parseInt(moment(b).day()) ? 
    (parseInt(moment(a).month()) > parseInt(moment(b).month()) ? 1 : -1) : -1),
    minWidth: 220
  }, {
    Header: 'Fecha inserción',
    accessor: 'fecha_insert',
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["fecha_insert"] }),
    filterAll: true,
    Cell: row => (
      row.value
    ),
    sortMethod: (a, b) => 
    (parseInt(moment(a).day()) > parseInt(moment(b).day()) ? 
    (parseInt(moment(a).month()) > parseInt(moment(b).month()) ? 1 : -1) : -1),
    minWidth: 220
  }, {
    Header: 'Comentario', // Custom header components!
    accessor: 'comment',
    filterMethod: (filter, rows) =>
      matchSorter(rows, filter.value, { keys: ["comment"] }),
    filterAll: true,
    Cell: row => (
      row.value
    ),
    minWidth: 200
  }]