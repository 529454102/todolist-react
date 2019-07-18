import React, { useState } from 'react'
import { Button, Input, Row, Col } from 'antd';

function List(props) {
    console.log(props.item)
    const [inputValue, setInputValue] = useState(props.item.content)
    const submit = () => {
        if (inputValue.trim() === "") {
            props.handleEditStatus(props.index - 1, false)
            setInputValue(props.item.content)
            return
        }
        props.handleEditSumbit({ id: props.item.id, content: inputValue })
        setInputValue(props.item.content)
    }
    const close = () => {
        props.handleEditStatus(props.index - 1, false)
        setInputValue(props.item.content)
    }
    const editShow = () => {
        return (
            <Col span={22}>
                <Row>
                    <Col span={18}>
                        <Input onPressEnter={submit}  onChange={e => { setInputValue(e.target.value) }} value={inputValue} placeholder="请输入" size="small" />
                    </Col>
                    <Col span={6} >
                        <Row type="flex" justify="space-around">
                            <Button icon="check" size="small" onClick={submit}></Button>
                            <Button type="danger" icon="close" size="small" onClick={close}></Button>
                        </Row>
                    </Col>
                </Row>
            </Col>
        )
    }
    return (
        <Row type="flex" align="middle" style={{ marginBottom: '10px' }}>
            <Col span={2}>{props.index}</Col>
            {
                props.item.editStatus ? editShow() : <Col span={14}>{props.item.content}</Col>
            }
            {
                !props.item.editStatus ? <Col span={8}>
                    <Row type="flex" justify="space-between">
                        <Col span={8}>
                            <Button type="primary" size="small" onClick={() => { props.handleComplete(props.item.id) }}>完成</Button>
                        </Col>
                        <Col span={8}>
                            <Button size="small" onClick={() => { props.handleEditStatus(props.index - 1, true) }}>修改</Button>
                        </Col>
                        <Col span={8}>
                            <Button type="danger" size="small" onClick={() => { props.handleDel(props.item.id) }} >删除</Button>
                        </Col>
                    </Row>
                </Col> : ''
            }
        </Row>
    )
}


export default List