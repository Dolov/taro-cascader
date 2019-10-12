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
	onChange: Function;
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

	onChoose = (itemValue, tab) => {
		const isRepeatClick = this.getIsRepeatClick(itemValue)
		if (isRepeatClick) return
		const target = this.getChoosedValueItem(itemValue, tab)
		if (!target) return 
		const newTabList = this.handleTabTitleChange(itemValue, tab, target)
		this.handleReChoose(newTabList)
		this.handleNextTab(newTabList, target)
		this.onChange(newTabList)
		this.setState({
			tabList: newTabList,
		})
	}

	onChange(newTabList) {
		const { onChange } = this.props
		if (typeof onChange !== 'function') return 
		const ids = newTabList.map(item => item.value).filter(id => id !== defaultValue)
		onChange(ids)
	}

	lastChoosedValue: any = null
	// 判断是否点击在已选中的节点
	getIsRepeatClick(value): boolean {
		if (this.lastChoosedValue === value) {
			return true
		} 
		this.lastChoosedValue = value
		return false
	}

	// 获取选中的值的数据项
	getChoosedValueItem(value, tab) {
		const { dataSource } = tab
		const target = dataSource.find(item => item.value === value)
		return target
	}

	// 处理 tabs 选中的 tab 的 title 和 value
	handleTabTitleChange(value, tab, target) {
		const { tabList } = this.state
		const { label } =  target
		return tabList.map(item => {
			if (item === tab) {
				return {
					...tab,
					value,
					title: label,
				}
			}
			return item
		})
	}

	// 如果重新选择，则把下级选中项清空
	handleReChoose(newTabList) {
		const { currentTabIndex } = this.state
		if (currentTabIndex !== newTabList.length - 1) {
			newTabList.splice(currentTabIndex + 1, newTabList.length - currentTabIndex)
		} 
	}

	// 选中后是否添加下级 Tab
	handleNextTab(newTabList, target) {
		const { children } = target
		const { currentTabIndex } = this.state
		if (
			Array.isArray(children) && 
			children.length > 0
		) {
			newTabList.push({
				title: defaultTitle,
				value: defaultValue,
				dataSource: children
			})
			this.setState({
				currentTabIndex: currentTabIndex + 1
			})
		} 
	}

	render() {
		const { tabList, currentTabIndex } = this.state
		return (
			<View className={clsPrefix}>
				<AtTabs current={currentTabIndex} tabList={tabList} onClick={this.handleTabChange}>
					{tabList.map((tab, index) => {
						// key 不要使用此 value
						const { value } = tab
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