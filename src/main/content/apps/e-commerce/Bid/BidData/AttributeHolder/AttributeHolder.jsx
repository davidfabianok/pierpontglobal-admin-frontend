import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AttributeHolder extends PureComponent {
  constructor(props) {
    super(props);

    const {
      title, value, copy, style,
    } = this.props;

    this.state = {
      hasError: false,
      title,
      value,
      copy,
      style,
    };

    this.text = React.createRef();
    this.copy_text = this.copy_text.bind(this);
  }

  copy_text() {
    const copyText = this.text.current;
    const textArea = document.createElement('textarea');
    textArea.value = copyText.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('Copy');
    textArea.remove();
  }

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return <h1>Something went wrong.</h1>;
    }

    const {
      title, value, copy, style,
    } = this.state;

    return (
      <p style={style}>
        {title}
:
        {' '}
        <span ref={this.text} style={{ fontWeight: 200 }}>
          {value}
        </span>
        {' '}
        {copy ? (
          <button onClick={this.copy_text} type="button">
            <i className="fa fa-clipboard" />
          </button>
        ) : <span />}
      </p>
    );
  }
}

AttributeHolder.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  copy: PropTypes.bool,
  style: PropTypes.object,
};

AttributeHolder.defaultProps = {
  title: '',
  value: '',
  copy: false,
  style: {},
};

export default AttributeHolder;
