import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'

interface dataSource {
	label: string;
	value: any;
	children?: Array<dataSource>
}

interface ICascader {
	dataSource: Array<dataSource>,
}

const clsPrefix = 'cp-cascader'
const defaultTitle = '请选择'

export default class Cascader extends Taro.PureComponent<ICascader> {

	static defaultProps = {
		dataSource: [],
	}

	state = {
		tabList: [{
			title: defaultTitle,
		}],
		currentTabIndex: 0,
	}

	handleTabChange = current => {
		this.setState({
			currentTabIndex: current
		})
	}

	render() {
		const { dataSource } = this.props
		const { tabList, currentTabIndex } = this.state
		return (
			<View className={clsPrefix}>
				<AtTabs current={currentTabIndex} tabList={tabList} onClick={this.handleTabChange}>
					<AtTabsPane current={currentTabIndex} index={0}>
						{dataSource.map(item => {
							const { label, value } = item
							return <View key={value}>{label}</View>
						})}
					</AtTabsPane>
				</AtTabs>
			</View>
		)
	}
}