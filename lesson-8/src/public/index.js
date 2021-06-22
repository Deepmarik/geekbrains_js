import '@babel/polyfill'
import 'whatwg-fetch'
import {app} from './js/app'
import './css/normalize.css'
import './css/styles.css'

const mainApp = new Vue(app);