let count= 0;

export async function load({ untrack, url }: { untrack: (fn: () => boolean) => boolean; url: URL }) {

	// Untrack url.pathname so that path changes don't trigger a rerun
	if (untrack(() => url.pathname === '/')) {
		return { message: 'Welcome!' };
	}
}

export async function loadCount({ depends }: { depends: (key: string) => void }) {
	depends('app:count');

	return { count: count++ };
}