import React from 'react'
import { Button, Row, Col } from 'antd';

function List(props) {
    return (
        <Row type="flex" align="middle" style={{ marginBottom: '10px' }}>
            <Col span={2}>{props.index}</Col>
            <Col span={19} style={{ textDecoration: 'line-through' }}>{props.item.content}</Col>
            <Col span={3}>
                <Button size="small" onClick={() => { props.handleRevocation(props.item.id) }} >撤销</Button>
            </Col>
        </Row>
    )
}


export default List