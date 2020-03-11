import Vue from 'vue'
import VueRouter from 'vue-router'
import HouseList from '../views/HouseList'
import Screen from '../views/Screen'
import Build from '../views/Building'
import RoomInfo from '../views/RoomInfo'
import Login from '../views/Login'
import My from '../views/My'
import FilterHouse from '../views/FilterHouse'
import Footer from '../components/footer'
import Dra from '../components/Dra'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    components: {
      "main": HouseList,
      "footer": Footer
    }
  },
  {
    path: '/nearby-property',
    name: 'screen',
    components: {
      "main": Screen
    }
  }, 
  {
    path: '/filter-house',
    name: 'filter',
    components: {
      'main': FilterHouse
    }
  },
   {
    path: '/independent-building',
    name: 'build',
    components: {
      'main': Build
    }
  },
  {
    path: '/roominfo',
    name: 'roominfo',
    components: {
      'main': RoomInfo
    }
  },
  {
    path: '/test',
    name: 'test',
    components: {
      'main': Dra
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      'main': Login
    }
  },
  {
    path: '/my',
    name: 'my',
    components: {
      'main': Login
    }
  }
]

const router = new VueRouter({
  routes
})

export default router