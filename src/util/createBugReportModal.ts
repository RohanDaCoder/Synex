import {
	ActionRowBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from 'discord.js';

function createBugReportModal(): ModalBuilder {
	const severityInput = new TextInputBuilder()
		.setCustomId('bug_severity')
		.setLabel('Severity')
		.setStyle(TextInputStyle.Short)
		.setPlaceholder('low, medium, high, or critical')
		.setRequired(true);

	const severityRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
		severityInput,
	);

	const titleInput = new TextInputBuilder()
		.setCustomId('bug_title')
		.setLabel('Bug Title')
		.setStyle(TextInputStyle.Short)
		.setPlaceholder('Brief summary of the bug')
		.setMaxLength(100)
		.setRequired(true);

	const titleRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
		titleInput,
	);

	const descriptionInput = new TextInputBuilder()
		.setCustomId('bug_description')
		.setLabel('Description')
		.setStyle(TextInputStyle.Paragraph)
		.setPlaceholder('Detailed description of the bug')
		.setMaxLength(1000)
		.setRequired(true);

	const descriptionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
		descriptionInput,
	);

	const stepsInput = new TextInputBuilder()
		.setCustomId('bug_steps')
		.setLabel('Steps to Reproduce')
		.setStyle(TextInputStyle.Paragraph)
		.setPlaceholder('Step-by-step instructions to reproduce the issue')
		.setMaxLength(1000)
		.setRequired(true);

	const stepsRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
		stepsInput,
	);

	return new ModalBuilder()
		.setTitle('Bug Report Submission')
		.setCustomId('bug_report_modal')
		.addComponents(severityRow, titleRow, descriptionRow, stepsRow);
}

export default createBugReportModal;
