import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles/index';
import {Card, CardContent, Typography, Icon, Tabs, Tab} from '@material-ui/core';
import classNames from 'classnames';
import {FuseAnimate} from '@fuse';
import RegularLoginTab from './tabs/RegularLoginTab';
import { withCookies } from 'react-cookie';

const styles = theme => ({
    root : {
        background    : "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat",
        backgroundSize: 'cover'
    },
    intro: {
        color: '#ffffff'
    },
    card : {
        width   : '100%',
        maxWidth: 600
    }
});

class Login extends Component {
    state = {
        tabValue: 2
    };

    handleTabChange = (event, value) => {
        this.setState({tabValue: value});
    };

    render()
    {
        const {classes} = this.props;
        const {tabValue} = this.state;

        return (
            <div className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>

                <div
                    className={classNames(classes.intro, "flex flex-col flex-no-grow items-center p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left")}>

                    <FuseAnimate animation="transition.expandIn">
                        <img className="w-320 mb-12" src="assets/images/logos/logo4awhite.png" alt="logo"/>
                    </FuseAnimate>

                    <FuseAnimate animation="transition.slideUpIn" delay={300}>
                        <Typography variant="h3" color="inherit" className="font-light">
                            Welcome to Pierpont Global   
                        </Typography>


                    </FuseAnimate>

                    <FuseAnimate delay={400}>
                        <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                            Pierpont Global is a licensed partner of Manheim and Cox Automitive Inc.
                            A platform designed to make buying vehicles much easier.
                        </Typography>
                    </FuseAnimate>
                </div>

                <FuseAnimate animation={{translateX: [0, '100%']}}>

                    <Card className={classNames(classes.card, "mx-auto m-16 md:m-0")}>

                        <CardContent className="flex flex-col items-center justify-center p-32 md:p-48 md:pt-128 ">

                            <Typography variant="h6" className="text-center md:w-full mb-48">LOGIN TO PPG ADMIN PANEL</Typography>

                            <Tabs
                                value={tabValue}
                                onChange={this.handleTabChange}
                                fullWidth={true}
                                className="mb-32"
                            >
                                <Tab
                                    icon={<Icon className="h-40 text-40">security</Icon>}
                                    className="min-w-0"
                                    label="Sign In"
                                />
                            </Tabs>

                            {tabValue === 2 && <RegularLoginTab/>}

                        </CardContent>
                    </Card>
                </FuseAnimate>
            </div>
        )
    }
}

export default withCookies(withStyles(styles, {withTheme: true})(withRouter(Login)));
