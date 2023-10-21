import React from 'React';
import { Row } from 'antd';
import styles from './index.module.less';


type ConditionProps = {
  operator: string;
  conditions: (ConditionProps | {
    label: string;
    name: string;
    comparator: string;
    value: any;
    required: boolean;
  })[]
}

type ConditionEditorProps = {
  schema: ConditionProps;
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
  const validateSchema = (data: ConditionProps) => {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      if (data.hasOwnProperty('operator') && data.hasOwnProperty('conditions')) return true
    }
    return false;
  }

  const renderSchema = (data: ConditionProps) => {
    if (!validateSchema(data)) return;

    const { operator, conditions } = data;

    return <div className={styles.condition}>
      {/* <div className={styles.}></div> */}
    </div>
  }
  return <div className={styles.conditionEditor}>
    {renderSchema(data)}
  </div>
}

export default conditionEditor