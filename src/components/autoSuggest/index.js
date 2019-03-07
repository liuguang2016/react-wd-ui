import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

class AutoSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      valueBeforeUpDown: '',
      highlightedIndex: null,
      isCollapsed: true
    }
  }

  handleChange=(e)=> {
    this.setState({ value: e.target.value, valueBeforeUpDown: e.target.value });
  }

  handleSubmit=(e)=> {
    e.preventDefault();
    
    this.props.onSelect(this.state.value);

    this.clearSuggestions();
  }

  getSuggestions=()=> {
    if (!this.state.value) {
      return [];
    }

    const value = this.state.valueBeforeUpDown.toUpperCase();
    const { suggestions } = this.props;

    return suggestions.filter(suggestion => {
      return suggestion.toUpperCase().startsWith(value);
    });
  }

  updateHighlightedIndex=(direction)=> {
    const suggestions = this.getSuggestions();
    if (suggestions.length === 0) {
      return;
    }

    if (this.state.highlightedIndex === null) {
      // no suggestion selected
      if (direction === 1) {
        // select last suggestion
        this.setState({ highlightedIndex: 0, value: suggestions[0] });
      } else if (direction === -1) {
        // select first suggestion
        this.setState({
          highlightedIndex: suggestions.length - 1,
          value: suggestions[suggestions.length - 1]
        });
      }
    } else {
      const nextIndex = this.state.highlightedIndex + direction;
      if (nextIndex >= 0 && nextIndex < suggestions.length) {
        // inside suggestions index range
        this.setState({
          highlightedIndex: nextIndex,
          value: suggestions[nextIndex]
        });
      } else {
        this.setState({
          highlightedIndex: null,
          value: this.state.valueBeforeUpDown
        });
      }
    }
  }

  handleKeyDown=(e)=> {
    switch (e.keyCode) {
      case 38:
        this.updateHighlightedIndex(-1);
        break;
      case 40:
        this.updateHighlightedIndex(1);
        break;
      default:
        return;
    }
  }

  handleClick=(option)=> {
    const { onSelect } = this.props;
    this.setState({
      value:option
    })
    onSelect(option);
    this.clearSuggestions();
  }

  clearSuggestions=()=> {
    this.setState({highlightedIndex: null});
  }

  render() {
    const suggestions = this.getSuggestions();
    const inputRef = this.props.inputRef || null;

    return (
      <div className="auto-suggest">
        <form onSubmit={this.handleSubmit}>
          <input
            value={this.state.value}
            placeholder={this.props.placeholder || ''}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onFocus={() => this.setState({ isCollapsed: false })}
            onBlur={()=>this.setState({isCollapsed: true,highlightedIndex: null})}
            ref={inputRef}
          />
        </form>

        {this.state.isCollapsed  ? null : (
          <div className="suggestions">
            {suggestions.map((option, index) => {
              const status =
                index === this.state.highlightedIndex ? 'focused' : null;

              return (
                <div
                  key={option}
                  className={`option ${status}`}
                  onClick={() => {
                    this.handleClick(option);
                  }}
                  onMouseDown={() => this.handleClick(option)}
                  onMouseOver={() => this.setState({ highlightedIndex: index })}
                >
                  {option}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

AutoSuggest.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  inputRef: PropTypes.func
}

export default AutoSuggest;