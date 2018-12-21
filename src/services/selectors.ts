import { RouterState } from 'connected-react-router';

export const routingSelector = (state: { router: RouterState}) => state.router.location;
