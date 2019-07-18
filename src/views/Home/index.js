import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Row, Col, message, Tabs } from 'antd';
import { getData, addData, editData, delData } from "@/api/list";
import List from './components/list'
import CList from './components/clist'
import { setUser } from '@/store/action'
import { removeToken } from '@/utils/auth'
import './index.scss'
const { TabPane } = Tabs


class Home extends Component {
    constructor(props) {
        super(props)
        this.handleAdd = this.handleAdd.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.getList = this.getList.bind(this)
        this.handleComplete = this.handleComplete.bind(this)
        this.handleDel = this.handleDel.bind(this)
        this.handleEditStatus = this.handleEditStatus.bind(this)
        this.handleEditSumbit = this.handleEditSumbit.bind(this)
        this.handleRevocation = this.handleRevocation.bind(this)
        this.handleTabChange = this.handleTabChange.bind(this)
        this.state = {
            inputValue: "",
            status: 0,
            list: []
        }
    }
    componentDidMount() {
        this.getList()
    }
    componentDidUpdate() {

    }
    tabContent() {
        const { list } = this.state
        let listContent = []
        if (list.length > 0) {
            list.forEach((item, index) => {
                listContent.push(
                    <List className="mb-10"
                        key={item.id}
                        index={index + 1}
                        item={item}
                        handleComplete={this.handleComplete}
                        handleDel={this.handleDel}
                        handleEditStatus={this.handleEditStatus}
                        handleEditSumbit={this.handleEditSumbit}
                    />
                )
            })
            return listContent
        } else {
            return '暂无代办事项'
        }
    }
    tabCompleteContent() {
        const { list } = this.state
        let listContent = []
        if (list.length > 0) {
            list.forEach((item, index) => {
                listContent.push(
                    <CList className="mb-10"
                        key={item.id}
                        index={index + 1}
                        item={item}
                        handleRevocation={this.handleRevocation}
                    />
                )
            })
            return listContent
        } else {
            return '暂无完成事项'
        }
    }
    handleTabChange = key => {
        this.setState({ status: key }, () => {
            this.getList()
        })

    }
    render() {
        const { username } = this.props
        return (
            <div className="home-container">
                <div>欢迎您,{username}<a href="javascript:;" className="ml-10" onClick={this.props.handleLogout}>退出</a></div>
                <div className="inputContent">
                    <Row gutter={20}>
                        <Col span={16} offset={4}>
                            <Input onChange={this.inputChange} onPressEnter={this.handleAdd} value={this.state.inputValue} placeholder="请输入代办事项" />
                        </Col>
                        <Col span={4}>
                            <Button type="primary" onClick={this.handleAdd}>添加</Button>
                        </Col>
                    </Row>
                </div>
                <Tabs className="tl" defaultActiveKey="0" onChange={this.handleTabChange}>
                    <TabPane tab="未完成" key="0">
                        {this.tabContent()}
                    </TabPane>
                    <TabPane tab="已完成" key="1">
                        {this.tabCompleteContent()}
                    </TabPane>
                </Tabs>
            </div>
        )
    }
    inputChange(e) {
        this.setState({
            inputValue: e.target.value
        })
    }
    async getList() {
        const obj = {
            status: this.state.status
        }
        try {
            const res = await getData(obj)
            for (const item of res.list) {
                item.editStatus = 0;
            }
            this.setState({
                list: res.list
            })
        } catch (error) {

        }

    }
    async handleAdd() {
        if (this.state.inputValue.trim() === "") {
            return
        }
        const obj = {
            content: this.state.inputValue.trim()
        }
        try {
            await addData(obj)
            this.setState({
                inputValue: ""
            })
            message.success('添加成功')
            this.getList()
        } catch (error) {

        }
    }
    async handleComplete(id) {
        const obj = {
            id,
            status: 1
        }
        try {
            await editData(obj)
            this.getList()
            message.success('完成成功')
        } catch (error) {

        }
    }
    async handleDel(id) {
        const obj = {
            id
        };
        try {
            await delData(obj);
            this.getList();
            message.success('删除成功')
        } catch (error) { }
    }
    handleEditStatus(index, status) {
        let list = JSON.parse(JSON.stringify(this.state.list))
        if (status) {
            for (const i of list) {
                i.editStatus = 0
            }
            list[index].editStatus = 1
        } else {
            list[index].editStatus = 0
        }
        this.setState({
            list
        })
    }
    async handleEditSumbit({ id, content }) {
        const obj = {
            id,
            content: content.trim()
        }
        try {
            await editData(obj);
            this.getList();
            message.success('修改成功')
        } catch (error) { }
    }
    async handleRevocation(id) {
        const obj = {
            id,
            status: 0
        }
        try {
            await editData(obj)
            this.getList();
            message.success('撤销成功')
        } catch (error) {

        }

    }
}
const mapStatetoProps = state => {
    return {
        username: state.username
    }
}
const mapDispatchToProps = dispatch => {
    return {
        handleLogout() {
            dispatch(setUser({ username: "", token: "" }))
            removeToken('username')
            removeToken('token')
            message.error('请重新登陆')
        }
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Home)
