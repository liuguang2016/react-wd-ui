# react-wd-ui

万度定制开发的react开发中的UI组件

## Installation

To install the stable version:

```javascript
npm install react-wd-ui --save-dev
```

## Usage

```jsx
import AutoSuggest from 'react-wd-ui'
const suggestions = ['C', 'C++', 'Python', 'Java', 'Javascript', 'PHP'];
const handleSelect = (selection) => {
    console.log(`You selected ${selection}`);
};
<AutoSuggest suggestions={suggestions} onSelect={handleSelect} />
```

## Options

props.suggestions {array}

需要前缀匹配，并展示出来的可能数据

props.onSelect{Function}

选择提示数据时触发的回调函数