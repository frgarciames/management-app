import React, { Component } from 'react';
import firebase from 'firebase';

export function getCajas(){
    return firebase.database().ref().child('cajas')
}

export function deleteCaja(caja){
    var desertRef = firebase.database().ref().child('cajas/' + caja.id);
    
    desertRef.remove().then(function(){
        console.log('deleted caja con id ' + caja.id);
    }).catch(function(error){
        console.log('error al deletear');
    })
}