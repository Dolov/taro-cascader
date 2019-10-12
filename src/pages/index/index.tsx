import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTextarea, AtButton } from 'taro-ui'
import Cascader from '../../components/index'
import './index.scss'



const data = [
  {
    label: '北京',
    value: 'beijing',
    children: [{
      label: '海淀',
      value: 'haidian',
      children: [{
        label: '清河',
        value: 'qinghe',
        children: [{
          label: '永泰庄',
          value: 'yongtaizhuang',
          isLeaf: true,
        }]
      }]
    }]
  },
  {
    label: '江苏',
    value: 'jiangsu',
    children: [{
      label: '苏州',
      value: '苏州',
      children: [{
        label: '工业园区',
        value: 'gongyeyuanqu',
        children: [{
          label: '金鸡湖',
          value: 'jinjihu',
        }]
      }]
    }]
  },
]

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onChange = (value) => {
    console.log(value)
  }

  loadData = node => {
    return new Promise(resolve => {
      setTimeout(() => {
        node.children = [
          {label: '永泰东里', value: 'yongtaidongli'}
        ]
        resolve()
      }, 2000)
    })
  }

  render () {
    return (
      <View className='index'>
        <Cascader 
          dataSource={data}
          onChange={this.onChange}
          loadData={this.loadData}
        />
      </View>
    )
  }
}
