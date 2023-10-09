import MonacoEditor from 'react-monaco-editor';
import * as monaco from 'monaco-editor';
import { useState, useCallback, useRef } from 'react';
import styles from './monaco.module.less';
import './draw.css';
import { setLocaleData } from 'monaco-editor-nls';
import zh from 'monaco-editor-nls/locale/zh-hans.json';
// const monaco = require('monaco-editor/esm/vs/editor/editor.api');

const Monaco = () => {
  setLocaleData(zh);
  const [isDragging, setIsDraggable] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(400);
  const [originalY, setOriginalY] = useState<number>(0);

  const handleMouseDown = (e: any) => {
    e.stopPropagation();
    console.log('鼠标按下', e.clientY);
    setIsDraggable(true);
    setOriginalY(e.clientY);
  }

  const handleMouseUp = (e: any) => {
    e.stopPropagation();

    console.log('鼠标抬起', e.clientY);
    setIsDraggable(false);
    setOriginalY(0);
  }

  const handleMouseMove = (e: any) => {
    if (isDragging) {
      console.log('鼠标移动', e);
      const deltaY = e.clientY - originalY;
      requestAnimationFrame(() => {
        const newHeight = height + deltaY;

        setHeight(newHeight);
        setOriginalY(e.clientY);
      })
    }
  }

  const dbs = [{
    label: 'dbs',
    value: 'dbs',
    description: 'dbs'
  }] as any;

  const mock = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([{
          label: '字段',
          value: 'field',
          description: 'description111111'
        }])
      }, 500)
    })
  }

  return (
    <div style={{ height: '100vh' }} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div className={styles.monaco} >
        <MonacoEditor
          height={'100%'}
          language='sql'
          editorDidMount={(editor, monaco) => {
            monaco.languages.registerCompletionItemProvider('sql', {
              triggerCharacters: [' '],
              provideCompletionItems: async (model, position, context, token) => {
                console.log('context', context, token);
                const { triggerCharacter } = context;
                var word = model.getWordUntilPosition(position);
                var range = {
                  startLineNumber: position.lineNumber,
                  endLineNumber: position.lineNumber,
                  startColumn: word.startColumn - 4,
                  endColumn: word.endColumn,
                };
                if (triggerCharacter === ' ') {
                  const textBeforePointer = model.getValueInRange({
                    startLineNumber: position.lineNumber,
                    startColumn: 0,
                    endLineNumber: position.lineNumber,
                    endColumn: position.column
                  })

                  const tokens = textBeforePointer.trim().split(/\s+/)
                  const lastToken = tokens[tokens.length - 1]
                  if (['dbs'].includes(lastToken)) {
                    const columns = await mock() as any;
                    console.log('word======', range)

                    return {
                      suggestions: columns.map((item: any) => {
                        return {
                          label: item.value,
                          kind: monaco.languages.CompletionItemKind.Class,
                          documentation: item.description,
                          insertText: item.value,
                          range: {
                            startLineNumber: position.lineNumber,
                            endLineNumber: position.lineNumber,
                            startColumn: word.startColumn - 1,
                            endColumn: word.endColumn,
                          },
                          additionalTextEdits: [{
                            range: {
                              startLineNumber: position.lineNumber,
                              endLineNumber: position.lineNumber,
                              startColumn: word.startColumn - 4,
                              endColumn: word.startColumn - 1,
                            },
                            text: ''
                          }]
                          // range: range,
                          // range: {
                          //   startLineNumber: position.lineNumber,
                          //   endLineNumber: position.lineNumber,
                          //   startColumn: word.startColumn - 4,
                          //   endColumn: word.endColumn,
                          // }
                        }
                      })
                    }
                  } else {
                    return {
                      suggestions: []
                    }
                  }
                }
                console.log('range=====', range);
                // TODO: 获取编辑框中填写的内容
                var textUntilPosition = model.getValueInRange({
                  startLineNumber: 1,
                  startColumn: 1,
                  endLineNumber: position.lineNumber,
                  endColumn: position.column
                })
                console.log('textUntilPosition', textUntilPosition);
                // console.log('textBefor', lastToken);
                // if(['dbs'].includes(lastToken)) {
                //   const colums = await mock() as any;
                //   // dbs.push(...colums);
                //   console.log('xin', colums);
                //   return {
                //     suggestions: colums.map((item:any) => {
                //       return {
                //         label: item.value,
                //         kind: monaco.languages.CompletionItemKind.Class,
                //         documentation: item.description,
                //         insertText: item.value,
                //         range: range
                //       }
                //     })
                //   }
                // }
                // console.log('word', word);

                // const colums = await mock() as any;


                // // if(['dbs'].includes(word))
                // // console.log('word', word);


                // if(['dbs'].includes(word.word)) {
                //   dbs.push([...colums])
                //   console.log('columns====', dbs);
                // }
                // console.log('dbs===', dbs);

                // await new Promise((resolve, reject) => {
                //   setTimeout(() => {
                //     resolve('成功')
                //   }, 5000)
                // })
                // console.log('1111')

                return {
                  suggestions: dbs.map((item: any) => {
                    return {
                      label: item.value,
                      kind: monaco.languages.CompletionItemKind.Class,
                      documentation: item.description,
                      detail: item.description,
                      insertText: item.value,
                      range: range
                    }
                  })
                }

                return {
                  suggestions: [{
                    label: 'lodash-模型',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: "The Lodash library exported as Node.js modules.",
                    insertText: '"lodash": "*"',
                    range: range,
                  },
                  {
                    label: '"express"',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: "Fast, unopinionated, minimalist web framework",
                    insertText: '"express": "*"',
                    range: range,
                  },
                  {
                    label: '"mkdirp"',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: "Recursively mkdir, like <code>mkdir -p</code>",
                    insertText: '"mkdirp": "*"',
                    range: range,
                  },
                  {
                    label: '"my-third-party-library"',
                    kind: monaco.languages.CompletionItemKind.Function,
                    documentation: "Describe your library here",
                    insertText: '"${1:my-third-party-library}": "${2:1.2.3}"',
                    insertTextRules:
                      monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                    range: range,
                  }]
                }
              }
            })
          }}
          options={{
            automaticLayout: true
          }}
        />
        <div className={styles.handle}
          onMouseDown={handleMouseDown}

        // onMouseOut={handleMouseOut}
        >
          <div className={styles.icon}></div>
        </div>
      </div>
    </div>
  );
};

export default Monaco;
