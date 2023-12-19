import React from 'react';
import { Row, Col, Dropdown, Select, Input, Switch } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './condition.module.less';

type ConditionProps = {
  label: string;
  name: string;
  comparator: string;
  value: any;
  required: boolean;
}

type ConditionsProps = {
  operator: string;
  conditions: (ConditionsProps | ConditionProps)[]
}

type ConditionEditorProps = {
  schema: ConditionsProps;
}

const conditionEditor = (props: ConditionEditorProps) => {
  const data = {
    "operator": "AND",
    "conditions": [
      {
        "label": "[单行文本]标题",
        "name": "field1",
        "comparator": "EQ",
        "value": "2",
        "required": false
      },
      {
        "operator": "OR",
        "conditions": [
          {
            "label": "[单行文本]标题",
            "name": "field1",
            "comparator": "EQ",
            "value": "1",
            "required": false
          },
          {
            "label": "[单行文本]描述",
            "name": "field2",
            "comparator": "EQ",
            "value": "2",
            "required": false
          }
        ]
      }
    ]
  }
  const validateSchema = (data: Object) => {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      if (data.hasOwnProperty('operator') && data.hasOwnProperty('conditions')) return true
    }
    return false;
  }

  const renderCondition = (condition: ConditionProps) => {
    return <Row className={styles['sub-condition']} gutter={[8, 0]}>
      <Col span={5}>
        <Select className={styles['name']}>

        </Select>
      </Col>
      <Col span={3} className={styles['comparator']}>
        <Select></Select>
      </Col>
      <Col span={13}>
        <Row className={styles['values']}>
          <Select></Select>
          <Input></Input>
          <div className={styles['required']}>
            <Switch />
            {}
          </div>
        </Row>
      </Col>
      <Col span={3}>
        <div className={styles['btns']}>
          <div>添加</div>
          <div>删除</div>
        </div>
      </Col>
    </Row>
  }

  const renderSchema = (data: ConditionsProps) => {
    if (!validateSchema(data)) return;

    const { operator, conditions } = data;

    const operators = [{
      key: "AND",
      label: "且"
    }, {
      key: "OR",
      label: "或"
    }]
    const operatorMap: Record<string, string> = {
      "AND": "且",
      "OR": "或"
    }

    return <Row className={styles['condition']}>
      <div className={styles['operator']}>
        <Dropdown menu={{ items: operators }} trigger={['click']}>
          <div className={styles['btn']}>
            <div className={styles.text}>{operatorMap[operator]}</div>
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
      <div className={styles['horizontal-line']}>
        <div className={styles['line']}></div>
      </div>
      <div className={styles['sub-conditions']}>
        {
          conditions.map(((condition: ConditionProps | ConditionsProps) => {
            if (validateSchema(condition)) {
              return renderSchema(condition as ConditionsProps);
            }
            return renderCondition(condition as ConditionProps)
          }))
        }
      </div>
    </Row>
  }
  return <div className={styles['conditionEditor']}>
    {renderSchema(data)}
  </div>
}

export default conditionEditor