import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import { storiesOf } from '@storybook/react';
import { AnyAction, compose, Dispatch, ActionCreator } from 'redux';
import { connect, Provider as StoreProvider } from 'react-redux';
import { routerMiddleware, connectRouter, ConnectedRouter, LOCATION_CHANGE } from 'connected-react-router';

import { configureStore } from '../../stories';
import routeDependencies from './routeDependencies';

export const history = createBrowserHistory();

const initialState = {
    users: {
        data: [],
    },
};

const store = configureStore(
    initialState,
    {
        users: (state = { data: [] }, action: AnyAction) => {
            switch (action.type) {
                case 'SET_DATA':
                    return {
                        data: action.payload,
                    };
                case LOCATION_CHANGE:
                    return {
                        data: [],
                    };
                default:
                    return state;
            }
        },
        router: connectRouter(history),
    },
    routerMiddleware(history),
);

const readAndSetData = (readCount: number = 2) => ({
    type: 'SET_DATA',
    payload: [{ id: 1, name: 'Franta Vomáčka' }, { id: 2, name: 'Julian Zápotocký' }].slice(0, readCount),
});

interface User {
    id: number;
    name: string;
}

interface Props {
    users: User[];
    loadingText: string;
}

const UsersList = ({ users, loadingText }: Props) => (
    <ul>
        {users.length === 0 && loadingText}
        {users.map((user: User) => (
            <li key={user.id}>{user.name}</li>
        ))}
    </ul>
);

UsersList.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
    loadingText: PropTypes.string.isRequired,
};

interface State {
    users: {
        data: User[];
    };
}

const delayedDispatch = (dispatch: Dispatch, reduxAction: ActionCreator<any>) => {
    return (...args: any[]) => {
        setTimeout(() => dispatch(reduxAction(...args)), 3000);
    };
};

storiesOf('HOC/routeDependencies', module)
    .addDecorator(story => (
        <StoreProvider store={store}>
            <ConnectedRouter history={history}>{story()}</ConnectedRouter>
        </StoreProvider>
    ))
    .add('default enter handler', () => {
        const UsersListContainer = compose(
            connect(
                (state: State) => ({ users: state.users.data }),
                dispatch => ({ read: delayedDispatch(dispatch, readAndSetData) }),
            ),
            routeDependencies(),
        )(UsersList);

        return <UsersListContainer loadingText="Načítám všechny uživatele..." />;
    })
    .add('custom enter handler', () => {
        const UsersListContainer = compose(
            connect(
                (state: State) => ({ users: state.users.data }),
                dispatch => ({
                    read: delayedDispatch(dispatch, readAndSetData),
                }),
            ),
            routeDependencies({
                onRouteEnter: ({ read }) => {
                    if (typeof read === 'function') {
                        read(1);
                    }
                },
            }),
        )(UsersList);

        return <UsersListContainer loadingText="Načítám prvního uživatele..." />;
    });
