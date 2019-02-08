import Vue from 'vue'
import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDUUfebIsZwsd3DZ3S9CO5Wty5hUofdUKg',
    authDomain: 'growlog-d62ca.firebaseapp.com',
    databaseURL: 'https://growlog-d62ca.firebaseio.com',
    projectId: 'growlog-d62ca',
    storageBucket: 'growlog-d62ca.appspot.com',
    messagingSenderId: '271930629309'
  })
}

Vue.prototype.$firebase = firebase
