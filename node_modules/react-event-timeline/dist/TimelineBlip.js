'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimelineBlip = function (_Component) {
  _inherits(TimelineBlip, _Component);

  function TimelineBlip() {
    _classCallCheck(this, TimelineBlip);

    return _possibleConstructorReturn(this, (TimelineBlip.__proto__ || Object.getPrototypeOf(TimelineBlip)).apply(this, arguments));
  }

  _createClass(TimelineBlip, [{
    key: 'mergeNotificationStyle',
    value: function mergeNotificationStyle(iconColor) {
      return iconColor ? _extends({}, _styles2.default.eventType, { color: iconColor, borderColor: iconColor }) : _styles2.default.eventType;
    }
  }, {
    key: 'iconStyle',
    value: function iconStyle(_iconStyle) {
      return _extends({}, _styles2.default.materialIcons, _iconStyle);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          iconStyle = _props.iconStyle,
          icon = _props.icon,
          orientation = _props.orientation,
          iconColor = _props.iconColor,
          style = _props.style,
          otherProps = _objectWithoutProperties(_props, ['title', 'iconStyle', 'icon', 'orientation', 'iconColor', 'style']);

      var leftOrRightEvent = orientation === 'right' ? _extends({}, _styles2.default['event--right']) : _extends({}, _styles2.default['event--left']);
      return _react2.default.createElement(
        'div',
        { style: _extends({}, _styles2.default.event, { marginBottom: 50 }, style) },
        _react2.default.createElement(
          'div',
          { style: this.mergeNotificationStyle(iconColor) },
          _react2.default.createElement(
            'span',
            { style: this.iconStyle(iconStyle) },
            icon
          )
        ),
        _react2.default.createElement(
          'div',
          _extends({}, otherProps, { style: _extends({}, _styles2.default.blipStyle, leftOrRightEvent) }),
          _react2.default.createElement(
            'div',
            null,
            title
          )
        ),
        _react2.default.createElement('div', { style: _styles2.default.eventAfter })
      );
    }
  }]);

  return TimelineBlip;
}(_react.Component);

TimelineBlip.propTypes = {
  title: _propTypes2.default.node.isRequired,
  icon: _propTypes2.default.node,
  iconColor: _propTypes2.default.string,
  iconStyle: _propTypes2.default.object,
  style: _propTypes2.default.object,
  orientation: _propTypes2.default.string
};

TimelineBlip.defaultProps = {
  iconStyle: {},
  style: {}
};

exports.default = TimelineBlip;