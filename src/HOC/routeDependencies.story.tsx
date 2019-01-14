import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import { storiesOf } from '@storybook/react';
import { AnyAction, compose, Dispatch, ActionCreator } from 'redux';
import { connect, Provider as StoreProvider } from 'react-redux';
import { routerMiddleware, connectRouter, ConnectedRouter } from 'connected-react-router';

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
                default:
                    return state;
            }
        },
        router: connectRouter(history),
    },
    routerMiddleware(history),
);

const readAndSetData = () => ({
    type: 'SET_DATA',
    payload: [{ id: 1, name: 'Franta Vomáčka' }, { id: 2, name: 'Julian Zápotocký' }],
});

interface User {
    id: number;
    name: string;
}

interface Props {
    users: User[];
}

const UsersList = ({ users }: Props) => (
    <ul>
        {users.length === 0 && 'Načítám uživatele...'}
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
};

interface State {
    users: {
        data: User[];
    };
}

const delayedDispatch = (dispatch: Dispatch, reduxAction: ActionCreator<any>) => {
    return () => {
        setTimeout(() => dispatch(reduxAction()), 3000);
    };
};

storiesOf('HOC/translatable', module)
    .addDecorator(story => (
        <StoreProvider store={store}>
            <ConnectedRouter history={history}>{story()}</ConnectedRouter>
        </StoreProvider>
    ))
    .add('default names', () => {
        const UsersListContainer = compose(
            connect(
                (state: State) => ({ users: state.users.data }),
                dispatch => ({ read: delayedDispatch(dispatch, readAndSetData) }),
            ),
            routeDependencies(),
        )(UsersList);

        return <UsersListContainer />;
    });
