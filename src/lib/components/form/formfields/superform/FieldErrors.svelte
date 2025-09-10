<script>
	import { FieldErrors } from 'formsnap';
</script>

<FieldErrors>
	{#snippet children({ errors, errorProps })}
		{#each errors as err}
			<span style="color: red;" {...errorProps}>{err}</span>
		{/each}
	{/snippet}
</FieldErrors>

<style>
	span {
		font-size: 0.875rem;
	}
</style>
