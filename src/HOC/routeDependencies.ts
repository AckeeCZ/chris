import { compose } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router';
import fetchDependencies from './fetchDependencies';

const shouldReRoue = (oldProps: RouteComponentProps, newProps: RouteComponentProps) =>
    oldProps.location.pathname !== newProps.location.pathname ||
    oldProps.location.search !== newProps.location.search ||
    oldProps.location.hash !== newProps.location.hash;

interface Config<P> {
    onRouteEnter?: (props: P & RouteComponentProps) => void;
    onRouteLeave?: (props: P & RouteComponentProps) => void;
    shouldReRoute?: (prevProps: P & RouteComponentProps, props: P & RouteComponentProps) => boolean;
}

const routeDependencies = <P>(config?: Partial<Config<P>>) => {
    return compose(
        withRouter,
        fetchDependencies<P & RouteComponentProps>({
            onLoad: config && config.onRouteEnter,
            onUnload: config && config.onRouteLeave,
            shouldReFetch: (config && config.shouldReRoute) || shouldReRoue,
        }),
    );
};
export default routeDependencies;
