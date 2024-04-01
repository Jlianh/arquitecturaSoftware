import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux'
import store from './components/store'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { userSlice } from './components/features/userSlice'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApiProvider api={userSlice}> */}
        <App />
      {/* </ApiProvider> */}
    </Provider>
  </React.StrictMode>,
)
