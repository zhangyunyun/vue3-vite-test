import Axios from './ajax'

export function reqShopList(){
  return Axios.get('shopList')
}