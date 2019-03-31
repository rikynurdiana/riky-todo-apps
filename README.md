# Riky Todos Apps (React.js + Redux)

## Cara Menggunakan Aplikasi Riky Todo Apps
- Clone Project
- Install Dependensi Paket Yang Dibutuhkan
- Jalankan Aplikasi


# Clone Project
```sh
$ git clone git@github.com:rikynurdiana/riky-todos-apps.git
```
    

# Install Dependensi Paket Yang Dibutuhkan
```sh
$ npm install
$ npm install redux --save
$ npm install react-redux --save
$ npm install @material-ui/core --save
$ npm install @material-ui/icons --save
$ npm install riky-todo-reducer --save

```

# Jalankan Aplikasi
```sh
$ npm start
```

# Keterangan Aplikasi
Aplikasi ini dibuat dengan React.js
    https://reactjs.org/
Material yang digunakan untuk membuat aplikasi ini adalah @material-ui
    https://material-ui.com/
Untuk store management nya menggunakan Redux
    https://react-redux.js.org/
Khusus untuk reducer nya menggunakan riky-todo-reducer
    https://www.npmjs.com/package/riky-todo-reducer
    
Jika tidak ingin menggunakan reducer yang saya buat, anda bisa membuat sendiri dengan cara :
1 . Buat File baru /src/reducers/rootReducer.js
```sh
const initState = {
  listTodos: [
    {
      id: 1,
      text: 'Todo 1',
      completed: true
    },
    {
      id: 2,
      text: 'Todo 2',
      completed: true
    },
    {
      id: 3,
      text: 'Todo 3',
      completed: false
    }
  ],
}

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        listTodos: state.listTodos.concat({
          id: action.payLoad.id,
          text: action.payLoad.text,
          completed: action.payLoad.completed
        })
      }
    case 'DONE_TODO':
      const done = state.listTodos.map(e => {
        if (e.id === action.payLoad.id) {
          e = { ...e, completed: action.payLoad.completed };
        }
        return e;
      });

      return {
        ...state,
        listTodos: done
      }
    case 'UPDATE_TODO':
      const update = state.listTodos.map(e => {
        if (e.id === action.payLoad.id) {
          e = { ...e, text: action.payLoad.text };
        }
        return e;
      });

      return {
        ...state,
        listTodos: update
      }
    case 'DELETE_TODO':
      var remove = state.listTodos.filter(e => e.id !== action.payLoad.id);
      return {
        ...state,
        listTodos: remove
      }
    case 'CLEAR_DATA':
      return {
        ...state,
        listTodos: []
      }
    default:
      return state;
  }
}

export default rootReducer
```

2 . Ubah Script yang ada di index.js
```sh
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import {Provider} from 'react-redux';
//original
import rootReducer from 'riky-todo-reducer';

//ubah menjadi ini
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer)

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

serviceWorker.unregister();

```

# Selamat mencoba aplikasi riky-todos-app
