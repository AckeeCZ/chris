import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import { storiesOf } from '@storybook/react';
import { AnyAction, compose, bindActionCreators, Dispatch, ActionCreator } from 'redux';
import { connect, Provider as StoreProvider } from 'react-redux';

import { configureStore } from '../../stories';
import fetchDependencies from './fetchDependencies';

export const history = createBrowserHistory();

const initialState = {
    users: {
        data: [],
        count: 1,
    },
};

const store = configureStore(initialState, {
    users: (state = { data: [] }, action: AnyAction) => {
        switch (action.type) {
            case 'SET_DATA':
                return {
                    ...state,
                    data: action.payload,
                };
            case 'CLEAR_DATA':
                return {
                    ...state,
                    data: [],
                };
            case 'CHANGE_USERS_COUNT':
                return {
                    ...state,
                    count: action.payload,
                };
            default:
                return state;
        }
    },
});

interface State {
    users: {
        data: User[];
        count: number;
    };
}

const fetchAndSetData = (readCount: number = 2) => ({
    type: 'SET_DATA',
    payload: [
        { id: 1, name: 'Franta Vomáčka' },
        { id: 2, name: 'Julian Zápotocký' },
        { id: 3, name: 'Kevin Bacon' },
    ].slice(0, readCount),
});

const clearData = () => ({
    type: 'CLEAR_DATA',
});

const changeUsersCount = (count: number) => ({
    type: 'CHANGE_USERS_COUNT',
    payload: count,
});

interface User {
    id: number;
    name: string;
}

interface Props {
    users: User[];
    loadingText: string;
}

type ComponentProps = Pick<Props, 'loadingText'>;

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

const delayedDispatch = (dispatch: Dispatch, reduxAction: ActionCreator<any>) => {
    return (...args: any[]) => {
        setTimeout(() => dispatch(reduxAction(...args)), 3000);
    };
};

storiesOf('HOC/fetchDependencies', module)
    .addDecorator(story => <StoreProvider store={store}>{story()}</StoreProvider>)
    .add('default load handler', () => {
        const UsersListContainer = compose<React.SFC<ComponentProps>>(
            connect(
                (state: State) => ({ users: state.users.data }),
                dispatch => ({
                    fetch: delayedDispatch(dispatch, fetchAndSetData),
                    clear: bindActionCreators(clearData, dispatch),
                }),
            ),
            fetchDependencies(),
        )(UsersList);

        return <UsersListContainer loadingText="Načítám všechny uživatele..." />;
    })
    .add('custom load handler', () => {
        const UsersListContainer = compose<React.SFC<ComponentProps>>(
            connect(
                (state: State) => ({ users: state.users.data }),
                dispatch => ({
                    fetch: delayedDispatch(dispatch, fetchAndSetData),
                    clear: bindActionCreators(clearData, dispatch),
                }),
            ),
            fetchDependencies({
                onLoad: ({ fetch }) => {
                    if (typeof fetch === 'function') {
                        fetch(1);
                    }
                },
            }),
        )(UsersList);

        return <UsersListContainer loadingText="Načítám prvního uživatele..." />;
    })
    .add('custom should refetch', () => {
        interface ListProps {
            users: User[];
            loadUsersCount: number;
        }

        const UsersListContainer = compose<React.SFC<ComponentProps>>(
            connect(
                (state: State) => ({
                    users: state.users.data,
                    loadUsersCount: state.users.count,
                }),
                dispatch => ({
                    fetch: delayedDispatch(dispatch, fetchAndSetData),
                    clear: bindActionCreators(clearData, dispatch),
                }),
            ),
            fetchDependencies<ListProps>({
                onLoad: ({ fetch, loadUsersCount }) => {
                    if (typeof fetch === 'function') {
                        fetch(loadUsersCount);
                    }
                },
                shouldReFetch: (prevProps, props) => prevProps.loadUsersCount !== props.loadUsersCount,
            }),
        )(UsersList);

        return (
            <div>
                <UsersListContainer loadingText="Načítám uživatele..." />
                <select onChange={e => store.dispatch(changeUsersCount(Number(e.target.value)))}>
                    <option value={1}>Load one user</option>
                    <option value={2}>Load two users</option>
                    <option value={3}>Load three users</option>
                </select>
            </div>
        );
    });
