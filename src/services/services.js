import React, { Component } from 'react';
import firebase from 'firebase';

export function getCajas(){
    return firebase.database().ref().child('cajas')
}

export function getFacturas(){
    return firebase.database().ref().child('facturas')
}

export function getProviders(){
    return firebase.database().ref().child('providers')
}

export function deleteCaja(caja){
    var desertRef = firebase.database().ref().child('cajas/' + caja.id);
    
    desertRef.remove().then(function(){
        console.log('deleted caja con id ' + caja.id);
    }).catch(function(error){
        console.log('error al deletear');
    })
}

export function deleteFactura(factura){
    var desertRef = firebase.database().ref().child('facturas/' + factura.id);
    
    desertRef.remove().then(function(){
        console.log('deleted factura con id ' + factura.id);
    }).catch(function(error){
        console.log('error al deletear');
    })
}