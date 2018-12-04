import React from "react";
import {injectReducer} from 'store';

const withReducer = (key, reducer) => z =>
    class extends React.PureComponent {
        constructor(props)
        {
            super(props);
            injectReducer(key, reducer);
        };

        render()
        {
            return <WrappedComponent {...this.props} />;
        };
    };

export default withReducer;
