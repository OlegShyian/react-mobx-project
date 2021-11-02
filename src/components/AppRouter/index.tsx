import { observer } from 'mobx-react-lite'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { privateRoutes, publicRoutes } from '../../router'
import User from '../../store/User'

const AppRouter: React.FC = () => {
    const isAuth = User.isAuth;
    return (
        <>
            {isAuth
                ?
                <Switch>
                    {privateRoutes.map(route =>
                        <Route
                            key={route.patch}
                            component={route.component}
                            path={route.patch}
                            exact={route.exact}
                        />
                    )}
                    <Redirect to="/tasks" />
                </Switch>
                :
                <Switch>
                    {publicRoutes.map(route =>
                        <Route
                            key={route.patch}
                            component={route.component}
                            path={route.patch}
                            exact={route.exact}
                        />
                    )
                    }
                    <Redirect to="/start" />
                </Switch >}
        </>

    )
}

export default observer(AppRouter);
