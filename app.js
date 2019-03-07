
import React from 'react';
import ReactDOM from 'react-dom';

// import AutoSuggest from './src/components/autoSuggest';
import {AutoSuggest} from 'react-wd-ui'

const suggestions = ['C', 'C++', 'Python', 'Java', 'Javascript', 'PHP'];
const handleSelect = (selection) => {
    console.log(`You selected ${selection}`);
};

ReactDOM.render(<AutoSuggest suggestions={suggestions} onSelect={handleSelect} />, document.getElementById('app'));