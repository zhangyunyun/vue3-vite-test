import {defineComponent} from 'vue'
import { createNamespace } from '@/utils/create'
import { Loading } from 'vant'

const [name, bem] = createNamespace('list')

export default defineComponent({
  name: 'OpList',
  props:{
    offset: {
      type: Number,
      default: 300,
    },
    direction:{
      type: String,
      default:'down'
    },
    loading: {
      type: Boolean,
    },
    loadingText: {
      type: String,
    },
    finished: {
      type: Boolean,
    },
    finishedText: {
      type: String,
    },
  },
  setup(props, { slots, emit }) {
    /*
      setup(props, { attrs, slots, emit }){}
        props: 包含props配置声明且传入了的所有属性的对象    
        attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
        slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
        emit:  用来分发自定义事件的函数, 相当于 this.$emit
    */
    const loading = ref(props.loading)
    const root = ref()
    const placeholder = ref('')

    //加载中
    const renderLoading = () => {
      if(loading.value && !props.finished){
        return(
          <div class={bem('loading')}>
            {
              slots.loading ? (loading.value) : (<Loading class={bem('loading-icon')}>{props.loadingText || '加载中'}</Loading>)
            }
          </div> 
        )
      }
    } 

    //加载完成
    const renderFinishedText = () => {
      if(props.finished){
        const text = slots.finished ? slots.finished() : props.finishedText
        if(text){
          return(
            <div class={bem('finished-text')}>{text}</div>
          )
        }
      }
    }

    return () => {
      const Content = slots.default?.()
      const Placeholder = <div ref={placeholder} class={bem('placeholder')}></div>
      return (
        <div ref={root} class={bem()}>
          {props.direction === 'down' ? Content : Placeholder}
          {renderLoading()}
          {renderFinishedText()}
          {props.direction === 'up' ? Content : Placeholder}
        </div>
      )
    }
  },
})