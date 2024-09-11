import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  function normalizeWord(value, words) {
    value = Math.abs(value);
    let options = [2, 0, 1, 1, 1, 2];
    return words[
      value % 100 > 4 && value % 100 < 20 ? 2 : options[value % 10 < 5 ? value % 10 : 5]
    ];
  }

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map((item, i) => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{i + 1}</div>
                <div className="Item-title">{item.title}</div>
                {item.selectedCount && (
                  <div className="Item-title">
                    Выделяли {item.selectedCount}{' '}
                    {normalizeWord(item.selectedCount, ['раз', 'раза', 'раз'])}
                  </div>
                )}
                <div className="Item-actions">
                  <button onClick={() => store.deleteItem(item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
