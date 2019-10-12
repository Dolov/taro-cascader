import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtRadio, AtActivityIndicator } from 'taro-ui'

interface IPanel {
  data: Object;
  index: number;
  onChoose: Function;
  currentTabIndex: number;
}

const atActivityIndicatorColor = '#6190E8'
const atActivityIndicatorContent = '数据加载中'

const atActivityIndicatorWrapperStyle = {
  height: '100px',
  position: 'relative',
}

export default class Panel extends Taro.PureComponent<IPanel> {

	static defaultProps = {
		dataSource: [],
	}

	state = {
		
	}

  handleChoose = value => {
    const { data, onChoose } = this.props
    onChoose(value, data)
  }

	render() {
    const { currentTabIndex, index, data } = this.props
    const { dataSource, value, loading } = data || {}
		return (
			<AtTabsPane current={currentTabIndex} index={index}>
        {loading&&(
          <View style={atActivityIndicatorWrapperStyle}>
            <AtActivityIndicator 
              mode="center"
              color={atActivityIndicatorColor} 
              content={atActivityIndicatorContent}
            />
          </View>)}
        {!loading&&(
          <AtRadio
            options={dataSource}
            value={value}
            onClick={this.handleChoose}
          />
        )}
      </AtTabsPane>
		)
	}
}