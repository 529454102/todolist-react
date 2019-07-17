import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.scss'
import { Button, Input, Row, Col } from 'antd';


class Home extends Component {
    constructor(props){
        super(props)
        this.handleAdd.bind(this)
    }
    render() {
        const { list, username } = this.props
        return (
           <div className="home-container">
               <div>欢迎您,{username}<a href="javascript:;" className="ml-10">退出</a></div>
               <div className="inputContent">
                    <Row gutter={20}>
                        <Col span={16} offset={4}>
                            <Input placeholder="请输入代办事项" />
                        </Col>
                        <Col span={4}>
                            <Button type="primary" onClick={this.handleAdd}>添加</Button>
                        </Col>
                    </Row>
               </div>
           </div>
        )
    }
    handleAdd(e) {
        console.log(e)
        console.log(this.props)
    }
}
const mapStatetoProps = state => {
    return {
        list: state.list,
        username: state.username
    }
}

export default connect(mapStatetoProps)(Home)
