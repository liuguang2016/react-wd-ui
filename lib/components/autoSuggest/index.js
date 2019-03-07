'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./index.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoSuggest = function (_React$Component) {
  _inherits(AutoSuggest, _React$Component);

  function AutoSuggest(props) {
    _classCallCheck(this, AutoSuggest);

    var _this = _possibleConstructorReturn(this, (AutoSuggest.__proto__ || Object.getPrototypeOf(AutoSuggest)).call(this, props));

    _this.handleChange = function (e) {
      _this.setState({ value: e.target.value, valueBeforeUpDown: e.target.value });
    };

    _this.handleSubmit = function (e) {
      e.preventDefault();

      _this.props.onSelect(_this.state.value);

      _this.clearSuggestions();
    };

    _this.getSuggestions = function () {
      if (!_this.state.value) {
        return [];
      }

      var value = _this.state.valueBeforeUpDown.toUpperCase();
      var suggestions = _this.props.suggestions;


      return suggestions.filter(function (suggestion) {
        return suggestion.toUpperCase().startsWith(value);
      });
    };

    _this.updateHighlightedIndex = function (direction) {
      var suggestions = _this.getSuggestions();
      if (suggestions.length === 0) {
        return;
      }

      if (_this.state.highlightedIndex === null) {
        // no suggestion selected
        if (direction === 1) {
          // select last suggestion
          _this.setState({ highlightedIndex: 0, value: suggestions[0] });
        } else if (direction === -1) {
          // select first suggestion
          _this.setState({
            highlightedIndex: suggestions.length - 1,
            value: suggestions[suggestions.length - 1]
          });
        }
      } else {
        var nextIndex = _this.state.highlightedIndex + direction;
        if (nextIndex >= 0 && nextIndex < suggestions.length) {
          // inside suggestions index range
          _this.setState({
            highlightedIndex: nextIndex,
            value: suggestions[nextIndex]
          });
        } else {
          _this.setState({
            highlightedIndex: null,
            value: _this.state.valueBeforeUpDown
          });
        }
      }
    };

    _this.handleKeyDown = function (e) {
      switch (e.keyCode) {
        case 38:
          _this.updateHighlightedIndex(-1);
          break;
        case 40:
          _this.updateHighlightedIndex(1);
          break;
        default:
          return;
      }
    };

    _this.handleClick = function (option) {
      var onSelect = _this.props.onSelect;

      _this.setState({
        value: option
      });
      onSelect(option);
      _this.clearSuggestions();
    };

    _this.clearSuggestions = function () {
      _this.setState({ highlightedIndex: null });
    };

    _this.state = {
      value: '',
      valueBeforeUpDown: '',
      highlightedIndex: null,
      isCollapsed: true
    };
    return _this;
  }

  _createClass(AutoSuggest, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var suggestions = this.getSuggestions();
      var inputRef = this.props.inputRef || null;

      return _react2.default.createElement(
        'div',
        { className: 'auto-suggest' },
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit },
          _react2.default.createElement('input', {
            value: this.state.value,
            placeholder: this.props.placeholder || '',
            onChange: this.handleChange,
            onKeyDown: this.handleKeyDown,
            onFocus: function onFocus() {
              return _this2.setState({ isCollapsed: false });
            },
            onBlur: function onBlur() {
              return _this2.setState({ isCollapsed: true, highlightedIndex: null });
            },
            ref: inputRef
          })
        ),
        this.state.isCollapsed ? null : _react2.default.createElement(
          'div',
          { className: 'suggestions' },
          suggestions.map(function (option, index) {
            var status = index === _this2.state.highlightedIndex ? 'focused' : null;

            return _react2.default.createElement(
              'div',
              {
                key: option,
                className: 'option ' + status,
                onClick: function onClick() {
                  _this2.handleClick(option);
                },
                onMouseDown: function onMouseDown() {
                  return _this2.handleClick(option);
                },
                onMouseOver: function onMouseOver() {
                  return _this2.setState({ highlightedIndex: index });
                }
              },
              option
            );
          })
        )
      );
    }
  }]);

  return AutoSuggest;
}(_react2.default.Component);

AutoSuggest.propTypes = {
  suggestions: _propTypes2.default.arrayOf(_propTypes2.default.string).isRequired,
  onSelect: _propTypes2.default.func,
  placeholder: _propTypes2.default.string,
  inputRef: _propTypes2.default.func
};

exports.default = AutoSuggest;