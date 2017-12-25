import React, { Component } from 'react';
import firebase from 'firebase';

export function getCajas(){
    return firebase.database().ref().child('cajas')
}
