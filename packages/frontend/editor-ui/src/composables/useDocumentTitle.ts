import { useSettingsStore } from '@/stores/settings.store';

const DEFAULT_TITLE = 'EAWorkflow Automation';

export function useDocumentTitle() {
	const settingsStore = useSettingsStore();
	const { releaseChannel } = settingsStore.settings;
	const suffix =
		!releaseChannel || releaseChannel === 'stable'
			? 'b1go'
			: `b1go[${releaseChannel.toUpperCase()}]`;

	const set = (title: string) => {
		const sections = [title || DEFAULT_TITLE, suffix];
		document.title = sections.join(' - ');
	};

	const reset = () => {
		set('WHAT');
	};

	return { set, reset };
}
