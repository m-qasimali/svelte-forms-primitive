<script lang="ts" module>
	import type { FormPath } from 'sveltekit-superforms';
	type T = Record<string, unknown>;
	type U = FormPath<T>;
</script>

<script lang="ts" generics="T extends Record<string, unknown>, U extends FormPath<T>">
	import { Field, Control, Description } from 'formsnap';
	import type { SuperForm } from 'sveltekit-superforms';
	import FieldErrors from './FieldErrors.svelte';

	import { DatePicker } from 'bits-ui';
	import { CalendarDate, parseDate, type DateValue } from '@internationalized/date';
	import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';

	let {
		form,
		name,
		label = '',
		description = '',
		className = ''
	}: {
		form: SuperForm<T>;
		name: U;
		label?: string;
		description?: string;
		className?: string;
	} = $props();

	const { form: formData } = form;

	// local bindable DateValue for the bits-ui DatePicker
	let calendarValue = $state<DateValue | undefined>(undefined);

	// Sync: form -> calendarValue
	$effect(() => {
		// read raw value from form data (use a safe any-cast to satisfy TS generics)
		const raw = (formData as unknown as Record<string, unknown>)[name as unknown as string];

		if (typeof raw === 'string' && raw.length > 0) {
			// stored as ISO string like "2025-09-10"
			try {
				calendarValue = parseDate(raw);
			} catch {
				calendarValue = undefined;
			}
		} else if (raw instanceof CalendarDate) {
			// already a CalendarDate
			calendarValue = raw as DateValue;
		} else {
			// empty / undefined / not a date
			calendarValue = undefined;
		}
	});

	// Sync: calendarValue -> form
	$effect(() => {
		if (!calendarValue) {
			$formData[name] = '' as T[U]; // directly assign into store
			return;
		}

		if (calendarValue instanceof CalendarDate) {
			const iso = calendarValue.toString(); // "2025-09-10"
			$formData[name] = iso as T[U]; // direct reactive update
		}
	});
</script>

<Field {form} {name}>
	<Control>
		{#snippet children()}
			<DatePicker.Root bind:value={calendarValue} weekdayFormat="short" fixedWeeks={true}>
				<div class={`datepicker ${className}`}>
					{#if label}
						<DatePicker.Label class="datepicker-label">{label}</DatePicker.Label>
					{/if}

					<DatePicker.Input class="datepicker-input">
						{#snippet children({ segments })}
							{#each segments as { part, value }, i (part + i)}
								{#if part === 'literal'}
									<DatePicker.Segment {part} class="datepicker-segment-literal"
										>{value}</DatePicker.Segment
									>
								{:else}
									<DatePicker.Segment {part} class="datepicker-segment-editable"
										>{value}</DatePicker.Segment
									>
								{/if}
							{/each}
							<DatePicker.Trigger class="datepicker-trigger">
								<CalendarBlank class="datepicker-icon" />
							</DatePicker.Trigger>
						{/snippet}
					</DatePicker.Input>

					<DatePicker.Content sideOffset={6} class="datepicker-content">
						<DatePicker.Calendar class="datepicker-calendar">
							{#snippet children({ months, weekdays })}
								<DatePicker.Header class="datepicker-header">
									<DatePicker.PrevButton class="datepicker-nav-btn"
										><CaretLeft class="datepicker-icon" /></DatePicker.PrevButton
									>
									<DatePicker.Heading class="datepicker-heading" />
									<DatePicker.NextButton class="datepicker-nav-btn"
										><CaretRight class="datepicker-icon" /></DatePicker.NextButton
									>
								</DatePicker.Header>

								{#each months as month (month.value)}
									<DatePicker.Grid class="datepicker-grid">
										<DatePicker.GridHead>
											<DatePicker.GridRow class="datepicker-weekdays">
												{#each weekdays as day (day)}
													<DatePicker.HeadCell class="datepicker-weekday"
														>{day.slice(0, 2)}</DatePicker.HeadCell
													>
												{/each}
											</DatePicker.GridRow>
										</DatePicker.GridHead>

										<DatePicker.GridBody>
											{#each month.weeks as weekDates (weekDates)}
												<DatePicker.GridRow class="datepicker-week">
													{#each weekDates as date (date)}
														<DatePicker.Cell {date} month={month.value} class="datepicker-cell">
															<DatePicker.Day class="datepicker-day">{date.day}</DatePicker.Day>
														</DatePicker.Cell>
													{/each}
												</DatePicker.GridRow>
											{/each}
										</DatePicker.GridBody>
									</DatePicker.Grid>
								{/each}
							{/snippet}
						</DatePicker.Calendar>
					</DatePicker.Content>
				</div>
			</DatePicker.Root>
		{/snippet}
	</Control>

	{#if description}
		<Description>{description}</Description>
	{/if}

	<FieldErrors />
</Field>

<style>
	/* wrapper (scoped) */
	.datepicker {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		max-width: 320px;
	}

	:global(.datepicker-label) {
		font-size: 14px;
		font-weight: 500;
		margin-bottom: 4px;
		color: #222;
	}

	:global(.datepicker-input) {
		display: flex;
		align-items: center;
		border: 1px solid #d0d7de;
		border-radius: 8px;
		padding: 8px 10px;
		font-size: 14px;
		background: #ffffff;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
	}

	:global(.datepicker-input:hover) {
		border-color: #9fb0d6;
	}

	:global(.datepicker-input:focus-within) {
		border-color: #1976d2;
		box-shadow: 0 4px 12px rgba(25, 118, 210, 0.12);
	}

	:global(.datepicker-segment-literal) {
		color: #666;
		padding: 2px 4px;
		user-select: none;
	}

	:global(.datepicker-segment-editable) {
		padding: 2px 6px;
		border-radius: 6px;
		user-select: none;
		cursor: text;
	}

	:global(.datepicker-segment-editable:hover) {
		background: #f3f6fb;
	}

	:global(.datepicker-trigger) {
		margin-left: auto;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 4px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
	}

	:global(.datepicker-trigger:hover) {
		background: #f2f4f8;
	}

	:global(.datepicker-icon) {
		width: 18px;
		height: 18px;
		color: #475569;
		display: block;
	}

	/* Content + calendar wrapper (scoped) */
	:global(.datepicker-content) {
		margin-top: 8px;
		border-radius: 10px;
		padding: 12px;
		background: #fff;
		box-shadow: 0 8px 24px rgba(16, 24, 40, 0.08);
		border: 1px solid #e6edf7;
		max-width: 720px;
	}

	:global(.datepicker-calendar) {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 100%;
	}

	/* ---- Header and controls (scoped) ---- */
	:global(.datepicker-header) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}

	:global(.datepicker-nav-btn) {
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 6px;
		border-radius: 8px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	:global(.datepicker-nav-btn:hover) {
		background: #f3f6fb;
	}

	:global(.datepicker-heading) {
		font-weight: 600;
		font-size: 15px;
		color: #0f1724;
		text-align: center;
		flex: 1;
	}

	/* ---- Grid / weeks / weekdays (scoped) ---- */
	:global(.datepicker-grid) {
		display: inline-block;
		min-width: 240px;
		margin: 0 6px;
	}

	:global(.datepicker-weekdays) {
		display: flex;
		justify-content: space-between;
		gap: 4px;
		font-size: 12px;
		color: #64748b;
		margin-bottom: 6px;
	}

	:global(.datepicker-weekday) {
		width: 36px;
		text-align: center;
	}

	:global(.datepicker-week) {
		display: flex;
		justify-content: space-between;
		gap: 4px;
	}

	:global(.datepicker-cell) {
		width: 36px;
		height: 36px;
		text-align: center;
		position: relative;
	}

	:global(.datepicker-day) {
		width: 100%;
		height: 100%;
		border-radius: 8px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			background 0.12s,
			color 0.12s,
			transform 0.08s;
		user-select: none;
	}

	:global(.datepicker-day:hover) {
		background: #f3f6fb;
	}

	:global(.datepicker-day[data-selected]) {
		background: #0b63d8; /* selected color */
		color: #fff;
	}

	:global(.datepicker-day[data-today]) {
		box-shadow: inset 0 0 0 1px rgba(11, 99, 216, 0.15);
	}

	:global(.datepicker-day[data-disabled]),
	:global(.datepicker-day[aria-disabled='true']) {
		color: #94a3b8;
		pointer-events: none;
		opacity: 0.7;
	}

	/* small screens */
	@media (max-width: 440px) {
		:global(.datepicker-content) {
			min-width: 200px;
		}
		:global(.datepicker-weekday),
		:global(.datepicker-cell) {
			width: 28px;
			height: 28px;
		}
		:global(.datepicker-day) {
			border-radius: 6px;
			font-size: 12px;
		}
	}

	/* --------------------------
     Bits UI internals overrides
     (these must be global to affect Bits UI elements)
     -------------------------- */

	/* root / calendar container */
	:global([data-date-picker-root]),
	:global([data-date-picker]) {
		width: 100%;
	}

	:global([data-calendar-root]) {
		width: 100%;
	}

	/* header / nav */
	:global([data-calendar-header]) {
		/* allow your scoped header class to style layout,
       but provide a safe fallback for Bits internal header */
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}

	:global([data-calendar-prev-button]),
	:global([data-calendar-next-button]) {
		background: transparent;
		border: none;
		padding: 6px;
		border-radius: 8px;
		cursor: pointer;
	}

	:global([data-calendar-prev-button]:hover),
	:global([data-calendar-next-button]:hover) {
		background: #f3f6fb;
	}

	:global([data-calendar-heading]) {
		font-weight: 600;
		font-size: 15px;
		color: #0f1724;
	}

	/* grid */
	:global([data-calendar-grid]) {
		display: block;
		margin: 0;
	}

	:global([data-calendar-grid-head]) {
		display: block;
	}
	:global([data-calendar-grid-row]) {
		display: flex;
		gap: 4px;
		justify-content: space-between;
	}
	:global([data-calendar-head-cell]) {
		width: 36px;
		text-align: center;
		font-size: 12px;
		color: #64748b;
	}
	:global([data-calendar-grid-body]) {
		display: block;
	}

	/* cells & days - prefer data-calendar-day but include common alternatives */
	:global([data-calendar-cell]) {
		width: 36px;
		height: 36px;
		display: inline-block;
	}
	:global([data-calendar-day]),
	:global([data-rdp-day]) {
		width: 36px;
		height: 36px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: 8px;
		cursor: pointer;
		transition:
			background 0.12s,
			color 0.12s;
	}

	:global([data-calendar-day]:hover),
	:global([data-rdp-day]:hover) {
		background: #f3f6fb;
	}

	:global([data-calendar-day][data-selected]),
	:global([data-rdp-day][data-selected]) {
		background: #0b63d8 !important;
		color: #fff !important;
	}

	:global([data-calendar-day][data-today]),
	:global([data-rdp-day][data-today]) {
		box-shadow: inset 0 0 0 1px rgba(11, 99, 216, 0.15);
	}

	:global([data-calendar-day][data-disabled]),
	:global([data-rdp-day][data-disabled]) {
		color: #94a3b8;
		pointer-events: none;
		opacity: 0.8;
	}

	/* other helpers bits-ui may emit */
	:global([data-date-picker-input]) {
		width: 100%;
	}
</style>
