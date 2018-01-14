import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from 'firebase'
import uuid from 'uuid'
import Button from '../utils/button'
import Input from '../utils/input'
import { BrowserRouter, Link, Route, Router, Redirect } from 'react-router-dom'
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import styles from '../styles/styles.css'
import moment from 'moment-with-locales-es6';
import Table from './table'

export function printDataTable(cellInfo, cajas) {
    if(cellInfo.column.id instanceof Date || cellInfo.column.id instanceof Date){
        return (
            <div
                dangerouslySetInnerHTML={{
                    __html: moment(cajas[cellInfo.index][cellInfo.column.id]).format('LL')
                }}
                
            />
            
        )
    }
    return (
        <div
                dangerouslySetInnerHTML={{
                    __html: (cajas[cellInfo.index][cellInfo.column.id])
                }}
        />
    )
}


export function renderEditableForTable(cellInfo, dataInfo) {
    return (
        <div

            contentEditable
            suppressContentEditableWarning
            onBlur={e => {
                const data = [...dataInfo];
                data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                var caja = {
                    amount: cellInfo.original.amount,
                    comment: cellInfo.original.comment,
                    fecha_caja: cellInfo.original.fecha_caja,
                    fecha_insert: cellInfo.original.fecha_insert,
                    id: cellInfo.original.id
                }

                var updates = {};
                updates['/cajas/' + caja.id] = caja;

                firebase.database().ref().update(updates);

            }}
            dangerouslySetInnerHTML={{
                __html: dataInfo[cellInfo.index][cellInfo.column.id]
            }}

        />
    );
}

export const getMonths = () => {
    return         [{name: 'enero', id: 1},
        {name: 'febrero', id: 2},
        {name: 'marzo', id: 3},
        {name: 'abril', id: 4},
        {name: 'mayo', id: 5},
        {name: 'junio', id: 6},
        {name: 'julio', id: 7},
        {name: 'agosto', id: 8},
        {name: 'septiembre', id: 9},
        {name: 'octubre', id: 10},
        {name: 'noviembre', id: 11},
        {name: 'diciembre', id: 12}]
    }

