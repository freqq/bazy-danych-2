const QUERY_PLACEHOLDER = ':queryName';

export const NETGUARD_SMC_PATH = '/netguard-smc';
export const INCIDENTS_SUBPATH = '/incidents';
export const INCIDENTS_COMPLETED_SUBPATH = '/incidents-completed';
export const INCIDENTS_CLAIMED_SUBPATH = '/claimed';
export const INCIDENTS_PATH = `${NETGUARD_SMC_PATH}${INCIDENTS_SUBPATH}`;
export const ELASTIC_QUERY = `/statistics/elastic/query/${QUERY_PLACEHOLDER}`;
export const INTERNAL_SERVER_ERROR_PATH = `${NETGUARD_SMC_PATH}/internal-error`;

export const getElasticQueryPath = queryName => ELASTIC_QUERY.replace(QUERY_PLACEHOLDER, queryName);

export const getIncidentDetailsPath = incidentId => `${INCIDENTS_PATH}/${incidentId}`;
