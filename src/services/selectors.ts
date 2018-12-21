import { Location } from 'history';
import { RouterState } from 'connected-react-router';

export const routingSelector = (state: { router: RouterState}): Location => state.router.location;
