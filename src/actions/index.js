import * as RouteActions from 'actions/routeActions';
import * as UserActions from 'actions/userActions';
import * as ErrorActions from 'actions/errorActions';
import * as MetaDataActions from 'actions/metaDataActions';
import * as SheetDataActions from 'actions/sheetDataActions';

export const ActionCreators = Object.assign(
  {},
  RouteActions,
  UserActions,
  ErrorActions,
  MetaDataActions,
  SheetDataActions,
);
