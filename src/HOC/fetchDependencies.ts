import { compose } from 'redux';
import { lifecycle, pure } from 'recompose';
import { defaults } from 'lodash';
import { logger } from '../config';

const log = {
    error: {
        load(load: any) {
            logger.warn(`The onLoad has to be a function. You have supplied: ${typeof load}`);
        },
        unload(unload: any) {
            logger.warn(`The onUnload has to be a function. You have supplied: ${typeof unload}`);
        },
        reFetch(reFetch: any) {
            logger.warn(`The shouldReFetch has to be a function. You have supplied: ${typeof reFetch}`);
        },
    },
};

const enterHandler = (props: OptionalProps) => {
    if (typeof props.fetch === 'function') {
        props.fetch();
    }
};

const leaveHandler = (props: OptionalProps) => {
    if (typeof props.clear === 'function') {
        props.clear();
    }
};

const reFetchHandler = <P = any>(oldProps: P, newProps: P) => false;

interface OptionalProps {
    fetch?: (...args: any[]) => void;
    clear?: (...args: any[]) => void;
}

interface Config<P> {
    onLoad: (props: P & OptionalProps) => void;
    onUnload: (props: P & OptionalProps) => void;
    shouldReFetch: (prevProps: P, props: P) => boolean;
}

const fetchDependencies = <P>(config?: Partial<Config<P>>) => {
    const defaultConfig: Config<P> = {
        onLoad: enterHandler,
        onUnload: leaveHandler,
        shouldReFetch: reFetchHandler,
    };
    const { onLoad, onUnload, shouldReFetch } = defaults(config, defaultConfig);
    return compose(
        /* tslint:disable no-invalid-this */
        lifecycle<P & OptionalProps, {}>({
            componentDidMount() {
                if (typeof onLoad !== 'function') {
                    log.error.load(onLoad);
                } else {
                    onLoad(this.props);
                }
            },
            componentDidUpdate(prevProps: P) {
                if (typeof shouldReFetch !== 'function') {
                    log.error.reFetch(shouldReFetch);
                } else if (typeof onLoad !== 'function') {
                    log.error.load(onLoad);
                } else if (typeof onUnload !== 'function') {
                    log.error.unload(onUnload);
                } else if (shouldReFetch(prevProps, this.props)) {
                    onUnload(this.props);
                    onLoad(this.props);
                }
            },
            componentWillUnmount() {
                if (typeof onUnload !== 'function') {
                    log.error.unload(onUnload);
                } else {
                    onUnload(this.props);
                }
            },
        }),
        /* tslint:enable no-invalid-this */
        pure,
    );
};
export default fetchDependencies;
