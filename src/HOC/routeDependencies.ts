import { compose } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { lifecycle, pure, mapProps } from 'recompose';
import { identity, defaults } from 'lodash';

const logger = console;

const log = {
    error: {
        routeEnter(routeEnter: any) {
            logger.warn(`The onRouteEnter has to be a function. You have supplied: ${typeof routeEnter}`);
        },
        routeLeave(routeLeave: any) {
            logger.warn(`The onRouteLeave has to be a function. You have supplied: ${typeof routeLeave}`);
        },
        reRoute(reRoute: any) {
            logger.warn(`The shouldReRoute has to be a function. You have supplied: ${typeof reRoute}`);
        },
    },
};

const enterHandler = (props: OptionalProps) => {
    if (typeof props.read === 'function') {
        props.read();
    }
};

const leaveHandler = (props: OptionalProps) => {
    if (typeof props.clear === 'function') {
        props.clear();
    }
};

const reRouteHandler = (oldProps: RouteComponentProps, newProps: RouteComponentProps) =>
    oldProps.location.pathname !== newProps.location.pathname ||
    oldProps.location.search !== newProps.location.search ||
    oldProps.location.hash !== newProps.location.hash;

interface OptionalProps {
    read?: (...args: any[]) => void;
    clear?: (...args: any[]) => void;
}

interface Config<P> {
    onRouteEnter: (props: P & OptionalProps) => void;
    onRouteLeave: (props: P & OptionalProps) => void;
    shouldReRoute: (prevProps: P & RouteComponentProps, props: P & RouteComponentProps) => boolean;
    propsMapping: (props: P & OptionalProps) => void;
}

const routeDependencies = <P>(config?: Partial<Config<P>>) => {
    const defaultConfig: Config<P> = {
        onRouteEnter: enterHandler,
        onRouteLeave: leaveHandler,
        shouldReRoute: reRouteHandler,
        propsMapping: identity,
    };
    const { onRouteEnter, onRouteLeave, shouldReRoute, propsMapping } = defaults(config, defaultConfig);
    return compose(
        withRouter,
        /* tslint:disable no-invalid-this */
        lifecycle<P & OptionalProps & RouteComponentProps, {}>({
            componentDidMount() {
                if (typeof onRouteEnter !== 'function') {
                    log.error.routeEnter(onRouteEnter);
                } else {
                    onRouteEnter(this.props);
                }
            },
            componentDidUpdate(prevProps: P & RouteComponentProps) {
                if (typeof shouldReRoute !== 'function') {
                    log.error.reRoute(shouldReRoute);
                } else if (typeof onRouteEnter !== 'function') {
                    log.error.routeEnter(onRouteEnter);
                } else if (typeof onRouteLeave !== 'function') {
                    log.error.routeLeave(onRouteLeave);
                } else if (shouldReRoute(prevProps, this.props)) {
                    onRouteLeave(this.props);
                    onRouteEnter(this.props);
                }
            },
            componentWillUnmount() {
                if (typeof onRouteLeave !== 'function') {
                    log.error.routeLeave(onRouteLeave);
                } else {
                    onRouteLeave(this.props);
                }
            },
        }),
        /* tslint:enable no-invalid-this */
        pure,
        mapProps(propsMapping),
    );
};
export default routeDependencies;
