import { ServerError, Status } from 'nice-grpc';
import { getUserData } from '@/services/grpc/account/v2/get-user-data';
import { getNEXPassword } from '@/services/grpc/account/v2/get-nex-password';
import { getNEXData } from '@/services/grpc/account/v2/get-nex-data';
import { updatePNIDPermissions } from '@/services/grpc/account/v2/update-pnid-permissions';
import { exchangeTokenForUserData } from '@/services/grpc/account/v2/exchange-token-for-user-data';
import { deleteAccount } from '@/services/grpc/account/v2/delete-account';
import type { ServiceImplementation } from 'nice-grpc';
import type { AccountServiceDefinition } from '@pretendonetwork/grpc/account/v2/account_service';

const notImplemented = (): never => {
	throw new ServerError(Status.UNIMPLEMENTED, 'Not implemented');
};

export const accountServiceImplementationV2: ServiceImplementation<AccountServiceDefinition> = {
	getUserData,
	getNEXPassword,
	getNEXData,
	updatePNIDPermissions,
	exchangeTokenForUserData,
	deleteAccount,

	// The following methods are not yet implemented
	createAuditLogComment: notImplemented,
	createBanComment: notImplemented,
	createServer: notImplemented,
	deleteServer: notImplemented,
	deletePNID: notImplemented,
	exchangeIndependentServiceTokenForUserData: notImplemented,
	exchangeNEXTokenForUserData: notImplemented,
	exchangeOAuthTokenForUserData: notImplemented,
	exchangePasswordResetTokenForUserData: notImplemented,
	getBan: notImplemented,
	getDevice: notImplemented,
	getNEXAccount: notImplemented,
	getPNID: notImplemented,
	getServer: notImplemented,
	getPNIDs: notImplemented,
	issueBan: notImplemented,
	listAuditLogComments: notImplemented,
	listBans: notImplemented,
	listDevices: notImplemented,
	listNEXAccounts: notImplemented,
	listPNIDs: notImplemented,
	listServers: notImplemented,
	listAuditLogs: notImplemented,
	listBanComments: notImplemented,
	pardonBan: notImplemented,
	updateBan: notImplemented,
	updateDevice: notImplemented,
	updateNEXAccount: notImplemented,
	updateServer: notImplemented,
	updatePNID: notImplemented,
	validateIndependentServiceToken: notImplemented
};
