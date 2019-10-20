import React from 'react';
import { connect } from "react-redux";
import { StoreState } from "./types";
import { Switch, Redirect, Route } from 'react-router-dom';
import Entry from "./Entry/Entry";
import Dashboard from "./Dashboard/Dashboard";

interface ComponentProps {
    isLoggedIn: boolean;
}

const App: React.FC<ComponentProps> = (props: ComponentProps) => {
    const { isLoggedIn } = props;
    return (
        <div className="App">
            {!isLoggedIn ?
                <Switch>
                    <Route component={Entry} path="/entry"/>
                    <Redirect to="/entry"/>
                </Switch> :
                <Switch>
                    <Route component={Dashboard} path="/dashboard"/>
                    <Redirect to="/dashboard"/>
                </Switch>}

        </div>
    );
};
const mapStateToProps = (state: StoreState) => ({
    isLoggedIn: state.isLoggedIn
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);
