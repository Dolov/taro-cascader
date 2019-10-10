import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtTextarea, AtButton } from 'taro-ui'
import Cascader from '../../components/index'
import './index.scss'



const data = [
  {
    label: '河南',
    value: 'henan',
    children: [{
      label: '平顶山',
      value: 'pingdingshan',
      children: [{
        label: '鲁山',
        value: 'lushan',
        children: [{
          label: '张官营',
          value: 'zhangguanying',
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
          label: '松泽',
          value: 'songze',
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


  render () {
    return (
      <View className='index'>
        <Cascader 
          dataSource={data}
        />
      </View>
    )
  }
}
