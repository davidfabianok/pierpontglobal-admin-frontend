import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import {FuseExample, FusePageSimple} from '@fuse';
import {Button, Icon, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
/* eslint import/no-webpack-loader-syntax: off */
const styles = theme => ({
    layoutRoot: {}
});

class ReactChartJs2Doc extends Component {

    render()
    {
        const {classes} = this.props;

        return (
            <FusePageSimple
                classes={{
                    root: classes.layoutRoot
                }}
                header={
                    <div className="flex flex-1 items-center justify-between p-24">
                        <Typography variant="h6">React ChartJs 2</Typography>
                        <Button
                            className="normal-case"
                            variant="contained"
                            component="a"
                            href="https://github.com/jerairrest/react-chartjs-2"
                            target="_blank"
                        >
                            <Icon className="mr-4">link</Icon>
                            Reference
                        </Button>
                    </div>
                }
                content={
                    <div className="p-24 max-w-2xl mx-auto">

                        <Typography className="mb-16" component="p">
                            <code className="language-bash">react-chartjs-2</code> is a React wrapper for Chart.js 2.
                        </Typography>

                        <hr/>

                        <Typography className="text-32 mt-32 mb-8" component="h2">Example Usages</Typography>

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/doughnut.jsx').default}
                            raw={require('!raw-loader!./examples/doughnut.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/dynamic-doughnut.jsx').default}
                            raw={require('!raw-loader!./examples/dynamic-doughnut.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/pie.jsx').default}
                            raw={require('!raw-loader!./examples/pie.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/line.jsx').default}
                            raw={require('!raw-loader!./examples/line.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/bar.jsx').default}
                            raw={require('!raw-loader!./examples/bar.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/horizontalBar.jsx').default}
                            raw={require('!raw-loader!./examples/horizontalBar.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/radar.jsx').default}
                            raw={require('!raw-loader!./examples/radar.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/polar.jsx').default}
                            raw={require('!raw-loader!./examples/polar.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/bubble.jsx').default}
                            raw={require('!raw-loader!./examples/bubble.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/scatter.jsx').default}
                            raw={require('!raw-loader!./examples/scatter.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/mix.jsx').default}
                            raw={require('!raw-loader!./examples/mix.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/randomizedLine.jsx').default}
                            raw={require('!raw-loader!./examples/randomizedLine.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/crazyLine.jsx').default}
                            raw={require('!raw-loader!./examples/crazyLine.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/legend-options.jsx').default}
                            raw={require('!raw-loader!./examples/legend-options.jsx')}
                        />

                        <FuseExample
                            className="mb-64"
                            component={require('./examples/legend-handlers.jsx').default}
                            raw={require('!raw-loader!./examples/legend-handlers.jsx')}
                        />

                        <Typography className="text-32 mt-32 mb-8" component="h2">Demos</Typography>

                        <ul>
                            <li className="mb-8">
                                <Link to="/apps/dashboards/analytics">Analytics Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                }
            />
        );
    }
}

export default withStyles(styles, {withTheme: true})(ReactChartJs2Doc);
