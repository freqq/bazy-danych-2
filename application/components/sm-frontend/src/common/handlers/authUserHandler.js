import RequestService from 'common/services/RequestService';

export const whoAmIPath = '/get-user';

export default () => RequestService.get(whoAmIPath);
