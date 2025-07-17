<script setup lang="ts">
import type { FrontendSettings } from '@n8n/api-types';
import { computed, onMounted, useCssModule, useTemplateRef } from 'vue';
import { useFavicon } from '@vueuse/core';

import LogoIcon from './logo-icon.svg';
import LogoText from './logo-text.svg';

const props = defineProps<
	(
		| {
				location: 'authView';
		  }
		| {
				location: 'sidebar';
				collapsed: boolean;
		  }
	) & {
		releaseChannel: FrontendSettings['releaseChannel'];
	}
>();

const { location, releaseChannel } = props;

const showLogoText = computed(() => {
	if (location === 'authView') return true;
	return !props.collapsed;
});

const $style = useCssModule();
const containerClasses = computed(() => {
	if (location === 'authView') {
		return [$style.logoContainer, $style.authView];
	}
	return [
		$style.logoContainer,
		$style.sidebar,
		props.collapsed ? $style.sidebarCollapsed : $style.sidebarExpanded,
	];
});

const svg = useTemplateRef<{ $el: Element }>('logo');
const logoText = useTemplateRef<{ $el: Element }>('logoText');
onMounted(() => {
	// logo icon (ya existente)
	if (releaseChannel !== 'stable' && 'createObjectURL' in URL) {
		const logoEl = svg.value!.$el;

		const logoColor = releaseChannel === 'dev' ? '#838383' : '#E9984B';
		logoEl.querySelector('path')?.setAttribute('fill', logoColor);

		const blob = new Blob([logoEl.outerHTML], { type: 'image/svg+xml' });
		useFavicon(URL.createObjectURL(blob));
	}

	/*const textEl = logoText.value?.$el;
	if (textEl) {
		// Variables o valores fijos
		const color1 = '#E9984B';
		const color2 = '#838383';

		// Aplica a todos los elementos
		textEl.querySelectorAll('.logo-part-1').forEach((p) => p.setAttribute('fill', color1));
		textEl.querySelectorAll('.logo-part-2').forEach((p) => p.setAttribute('fill', color2));
	}*/
});
</script>

<template>
	<div :class="containerClasses" data-test-id="n8n-logo">
		<LogoIcon ref="logo" :class="$style.logo" />
		<LogoText v-if="showLogoText" ref="logoText" :class="$style.logoText" />
		<slot />
	</div>
</template>

<style lang="scss" module>
.logoContainer {
	display: flex;
	justify-content: center;
	align-items: center;
}

.logoText {
	margin-left: var(--spacing-5xs);
	path {
		fill: var(--color-text-dark);
	}
}

.authView {
	transform: scale(2);
	margin-bottom: var(--spacing-xl);
}

.logo {
	transform: scale(1.3); // Normal
}

.authView .logo {
	transform: scale(1.3) translateY(1px); // Solo afecta login
}

.logoText {
	transform: scale(1.3) translateY(1px); // Texto se queda como estaba
	margin-left: var(--spacing-s);
	margin-right: var(--spacing-3xs);
}

.sidebarExpanded .logo {
	margin-left: var(--spacing-2xs);
}

.sidebarCollapsed .logo {
	width: 40px;
	height: 30px;
	padding: 0 var(--spacing-4xs);
}
</style>
