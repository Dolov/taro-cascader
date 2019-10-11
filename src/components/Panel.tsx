import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtRadio } from 'taro-ui'

interface IPanel {
  data: Object;
  index: number;
  onChoose: Function;
  currentTabIndex: number;
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
    const { dataSource, value } = data || {}
    console.log('render')
		return (
			<AtTabsPane current={currentTabIndex} index={index}>
        <AtRadio
          options={dataSource}
          value={value}
          onClick={this.handleChoose}
        />
      </AtTabsPane>
		)
	}
}