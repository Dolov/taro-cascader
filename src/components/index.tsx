import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtRadio } from 'taro-ui'
import Panel from './Panel'

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
const defaultValue = `${new Date().getTime()}-tempId`

export default class Cascader extends Taro.PureComponent<ICascader> {

	static defaultProps = {
		dataSource: [],
	}

	state = {
		tabList: [{
			title: defaultTitle,
			value: defaultValue,
			dataSource: this.props.dataSource
		}],
		currentTabIndex: 0,
	}

	handleTabChange = current => {
		this.setState({
			currentTabIndex: current
		})
	}

	lastChoosedValue: any = null

	onChoose = (itemValue, tab) => {
		if (this.lastChoosedValue === itemValue) return
		this.lastChoosedValue = itemValue
		const { dataSource } = tab
		const target = dataSource.find(item => item.value === itemValue)
		if (!target) return
		const { tabList, currentTabIndex } = this.state
		let nextTabIndex  = currentTabIndex + 1
		const { label, children } =  target
		const newTabList = tabList
			.map(item => {
				if (item === tab) {
					return {
						...tab,
						title: label,
						value: itemValue
					}
				}
				return item
			})
		if (currentTabIndex !== tabList.length - 1) {
			newTabList.splice(nextTabIndex, newTabList.length - currentTabIndex)
		} 
		if (
			Array.isArray(children) && 
			children.length > 0
		) {
			newTabList.push({
				title: defaultTitle,
				value: defaultValue,
				dataSource: children
			})
		} else {
			nextTabIndex = currentTabIndex
		}
		
		this.setState({
			currentTabIndex: nextTabIndex,
			tabList: newTabList,
		})
	}

	render() {
		const { tabList, currentTabIndex } = this.state
		return (
			<View className={clsPrefix}>
				<AtTabs current={currentTabIndex} tabList={tabList} onClick={this.handleTabChange}>
					{tabList.map((tab, index) => {
						return (
							<Panel 
								key={index}
								data={tab}
								index={index}
								onChoose={this.onChoose}
								currentTabIndex={currentTabIndex}
							/>
						)
					})}
				</AtTabs>
			</View>
		)
	}
}