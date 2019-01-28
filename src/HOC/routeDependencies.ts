import { compose } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router';
import fetchDependencies, { OptionalProps } from './fetchDependencies';

const shouldReRoue = (oldProps: RouteComponentProps, newProps: RouteComponentProps) =>
    oldProps.location.pathname !== newProps.location.pathname ||
    oldProps.location.search !== newProps.location.search ||
    oldProps.location.hash !== newProps.location.hash;

interface Config<P> {
    onRouteEnter?: (props: P) => void;
    onRouteLeave?: (props: P) => void;
    shouldReRoute?: (prevProps: P, props: P) => boolean;
}

const routeDependencies = <P>(config?: Partial<Config<P & OptionalProps & RouteComponentProps>>) => {
    return compose(
        withRouter,
        fetchDependencies<P & OptionalProps & RouteComponentProps>({
            onLoad: config && config.onRouteEnter,
            onUnload: config && config.onRouteLeave,
            shouldReFetch: (config && config.shouldReRoute) || shouldReRoue,
        }),
    );
};
export default routeDependencies;
