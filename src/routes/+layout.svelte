<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<div class="w-screen h-screen bg-slate-100">{@render children()}</div>
