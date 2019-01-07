import { Location } from 'history';
import { RouterState } from 'connected-react-router';

export type LocationSelector = (state: { router: RouterState }) => Location | null;

export interface Console {
    error(...args: any[]): any;
    warn(...args: any[]): any;
    log(...args: any[]): any;
}
