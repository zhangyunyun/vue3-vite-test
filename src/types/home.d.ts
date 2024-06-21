/*
   数据类型定义
*/
//搜索框下面搜索关键字列表
export interface ISearchRecommend {
   value: number,
   label: string
}

//搜索请求函数参数
export interface ISearchResultList {
   list: ISearchResult[]
}

//搜索结果列表
export interface ISearchResult {
   type: number,
   label: string,
   resultCount: number
}

//首页请求函数参数
export interface IHomeInfo {
   banner: IBanner[]
   searchRecommends: ISearchRecommend[]
   transformer: ITransformer[]
   scrollBarInfo: IScrollBarInfo[]
   countdown: ICountdown,
   activities: IActivities[]
}
//首页-banner
export interface IBanner {
   imgUrl: string
}
//首页-导航列表
export interface ITransformer {
   imgUrl: string
   label: string
}

export interface IScrollBarInfo {
   type: string
   badge: string
   detail: string
   btn: string
}

export interface ICountdown {
   time: number
   good: IGood
}

export interface IGood {

}

export interface IActivities {
   imgUrl: string
}