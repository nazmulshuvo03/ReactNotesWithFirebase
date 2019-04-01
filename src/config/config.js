import firebase from 'firebase/app';

// Initialize Firebase
const DB_CONFIG = {
	apiKey: 'AIzaSyDbIE7n6NJszZ_vJVDEf-7AdYlY-Jz1auk',
	authDomain: 'reactnotes-d00d3.firebaseapp.com',
	databaseURL: 'https://reactnotes-d00d3.firebaseio.com',
	projectId: 'reactnotes-d00d3',
	storageBucket: '',
	messagingSenderId: '998219550742'
};

firebase.initializeApp(DB_CONFIG);

export default firebase;
