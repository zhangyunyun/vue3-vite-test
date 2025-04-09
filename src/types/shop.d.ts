/*
 * @Description  : 请好好写代码
 * @verdion      : 
 * @Author       : yunyunzhang
 * @Date         : 2024-12-12 15:45:33
 * @LastEditors  : yunyunzhang
 * @LastEditTime : 2024-12-12 16:35:48
 */
export interface IShop {
  activitys: IActivity[]
  branch: string
  comments: string[]
  deliveryDistance: string
  deliveryStrategy: string
  deliveryStratingPrice: string
  deliveryTags: string[]
  deliveryTime: string
  id: string
  monthlyCount: number
  postUrl: string
  bgUrl: string
  score: number
  services: IService[]
  shopName: string
  tops: string[]
}

//商家提供的服务标签
export interface IService {
  type: number
  label: string
}

//活动
export interface IActivity {
  type: number
  tips?: string
  infos?: string[]
}
