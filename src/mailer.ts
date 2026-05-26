// src/mailer.ts

import path from 'node:path';
import fs from 'node:fs';
import nodemailer from 'nodemailer';
import { config } from '@/config-manager';
import { MailerOptions } from '@/types/common/mailer-options';

const genericEmailTemplate = fs.readFileSync(
	path.join(__dirname, './assets/emails/genericTemplate.html'),
	'utf8'
);

const confirmationEmailTemplate = fs.readFileSync(
	path.join(__dirname, './assets/emails/confirmationTemplate.html'),
	'utf8'
);

const transporter = nodemailer.createTransport({
	host: 'smtp.zoho.eu',
	port: 465,
	secure: true,
	auth: {
		user: config.email.auth.user,
		pass: config.email.auth.pass
	}
});

export async function sendMail(options: MailerOptions): Promise<void> {
	const {
		to,
		subject,
		username,
		paragraph,
		preview,
		text,
		link,
		confirmation
	} = options;

	let html = confirmation
		? confirmationEmailTemplate
		: genericEmailTemplate;

	html = html.replace(/{{username}}/g, username);
	html = html.replace(/{{paragraph}}/g, paragraph || '');
	html = html.replace(/{{preview}}/g, preview || '');
	html = html.replace(/{{confirmation-href}}/g, confirmation?.href || '');
	html = html.replace(/{{confirmation-code}}/g, confirmation?.code || '');

	if (link) {
		const { href, text } = link;

		const button = `<tr><td width="100%" height="16px" style="line-height: 16px;">&nbsp;</td></tr><tr><td class="confirm-link" bgcolor="#2ca8ce" style="font-size: 14px; font-weight: 700; border-radius: 10px; padding: 12px" align="center"><a href="${href}" style="text-decoration: none; color: #ffffff;" width="100%">${text}</a></td></tr>`;

		html = html.replace(/<!--{{buttonPlaceholder}}-->/g, button);
	}

	await transporter.sendMail({
		from: config.email.from,
		to,
		subject,
		text,
		html
	});
}