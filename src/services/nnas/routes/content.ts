import express from 'express';
import xmlbuilder from 'xmlbuilder';
import timezones from '@/services/nnas/timezones.json';

const router = express.Router();

/**
 * [GET]
 * Replacement for: https://account.nintendo.net/v1/api/content/agreements/TYPE/REGION/VERSION
 * Description: Sends the client requested agreement
 */
router.get('/agreements/:type/:region/:version', (request: express.Request, response: express.Response): void => {
	response.set('Content-Type', 'text/xml');
	response.set('Server', 'Nintendo 3DS (http)');
	response.set('X-Nintendo-Date', new Date().getTime().toString());

	response.send(xmlbuilder.create({
		agreements: {
			agreement: [
				{
					country: 'US',
					language: 'en',
					language_name: 'English',
					publish_date: '2014-09-29T20:07:35',
					texts: {
						'@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
						'@xsi:type': 'chunkedStoredAgreementText',

						'main_title': {
							'#cdata': 'Samtendo Network Services Agreement'
						},
						'agree_text': {
							'#cdata': 'I Accept'
						},
						'non_agree_text': {
							'#cdata': 'I Decline'
						},
						'main_text': {
							'@index': '1',
							'#cdata': 'SAMTENDO NETWORK SERVICES AGREEMENT\n\nEffective Date: May 25th 2026\n\nLast Updated: May 25th 2026\n\nFor the Samtendo Network Privacy Policy, please visit samtendo.net/terms/privacy.\nFor a full, printable copy of these terms, please visit samtendo.net/terms/network\nThis is only a preview.\n\n1. INTRODUCTION AND ACCEPTANCE\n\nThe Network Services Agreement (Agreement) is a legal document between You (User) and Samtendo Network (Company). It regulates your usage and access of Samtendo Network online services for Nintendo 3DS and Wii U gaming systems, including but not limited to multiplayer, online tournaments, and all other online features, content, and services (Services).\n\nThrough the access, download, installation, and usage of Services, you agree to be bound by the terms of this Agreement. By not agreeing with the terms, you shall not be allowed to use the Services. Any modifications in the terms can be made at any time at Our sole discretion. Any use of Services following notification of changes constitutes your acceptance of amended Agreement.\n\n2. ELIGIBILITY AND REGISTRATION\n\n2.1 Age Requirements\n\nYou represent and warrant that:\n- You are at least 13 years old (or minimum age requirement in your jurisdiction)\n- If you are under 18 years old, your usage has parental or guardian consent\n- You have never been suspended or banned from any of the Samtendo services\n- You are not located in a jurisdiction where Samtendo services are not available due to laws and regulations\n\n2.2 Account Creation and Security\n\nIf you register an account to use the Services, you agree to:\n- Enter and maintain accurate, complete and current information\n- Protect the confidentiality of your account credentials\n- Be responsible for any actions taken under your account\n- Inform us of any unauthorized use or security breaches\n- Not share your account with other individuals\n\nSamtendo Network is not responsible for any losses that occurred due to unauthorized account usage. You assume sole responsibility for securing your account credentials.\n\n2.3 Account Termination\n\nWe reserve the right to deactivate, suspend, or terminate your account at any time if violated Agreement terms or for any other reasons in Our sole discretion, with or without notice.\n\n3. SERVICES DESCRIPTION AND AVAILABILITY\n\n3.1 Supported Platforms\n\nThe Services can be used with the following gaming systems:\n- Nintendo 3DS (all regional models)\n- Wii U (all regional models)\n\n3.2 Service Features\n\nFeatures offered by the Samtendo Network include but are not limited to:\n- Online multi-player capabilities and matchmaking\n- Various online social features such as friends list\n- Online tournaments, competitions, and community events\n- In-game communication\n- Digital content distribution\n- Upgrades and patches for the game\n- In-game leaderboards and achievements\n- Online multiplayer and single-player progress saving\n\n3.3 Service Availability\n\nThe Services are provided on an AS IS and AS AVAILABLE basis. No guarantees for constant availability of services. We reserve the right to:\n- Stop providing the Services or give reasonable notification beforehand\n- Conduct maintenance which causes the temporary downtime of the Services\n- Temporarily limit or restrict access\n- Modify, update, remove or replace Service features\n\nNotification of service discontinuation: Reasonable notification (minimum of 30 days) will be given in advance of any discontinuation of core Services, where legally feasible. Nevertheless, We reserve the right to shut down the Services without notice in case of vulnerabilities, technical problems or when it is legally required.\n\nNo more content will be displayed due to technical limitations. However, the following sections are considered the most important. Please read the full terms at samtendo.net/terms/network on another device.',
						},
						'sub_title': {
							'#cdata': 'Important Information'
						},
						'sub_text': {
							'@index': '1',
							'#cdata': 'If your email has not been verified after an extended period of time, your account may be banned until you resolve it.\nIf you are not receiving the verification email, please join our Discord server for support.\n\nRegardless, please join the Samtendo Network Discord server anyways for the latest information. Invite: discord.samtendo.net\n\nYou should consistently check for Electrode updates to keep your console safe. You can download the latest version at any time by visiting samtendo.net/electrode. You can get pings for Electrode updates in our Discord server.'
						}
					},
					type: 'NINTENDO-NETWORK-EULA',
					version: '0300'
				}
			]
		}
	}).end());
});

/**
 * [GET]
 * Replacement for: https://account.nintendo.net/v1/api/content/time_zones/COUNTRY/LANGUAGE
 * Description: Sends the client the requested timezones
 */
router.get('/time_zones/:countryCode/:language', (request: express.Request, response: express.Response): void => {
	response.set('Content-Type', 'text/xml');
	response.set('Server', 'Nintendo 3DS (http)');
	response.set('X-Nintendo-Date', new Date().getTime().toString());

	/*
	// * Old method. Crashes WiiU when sending a list with over 32 entries, but otherwise works
	// * countryTimezones is "countries-and-timezones" module

	const country = countryTimezones.getCountry(countryCode);
	const timezones = country.timezones.map((timezone, index) => {
		const data = countryTimezones.getTimezone(timezone);

		return {
			area: data.name,
			language,
			name: data.name,
			utc_offset: data.utcOffset * 6 * 10,
			order: index+1
		};
	});
	*/

	const countryCode = request.params.countryCode;
	const language = request.params.language;

	const regionLanguages = timezones[countryCode as keyof typeof timezones];
	const regionTimezones = regionLanguages[language as keyof typeof regionLanguages] ? regionLanguages[language as keyof typeof regionLanguages] : Object.values(regionLanguages)[0];

	response.send(xmlbuilder.create({
		timezones: {
			timezone: regionTimezones
		}
	}).end());
});

export default router;