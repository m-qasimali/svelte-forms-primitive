<script lang="ts">
	import { DatePicker } from 'bits-ui';
	import { CalendarDate } from '@internationalized/date';
	import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';

	let {
		value = $bindable(),
		label = '',
		helperText = '',
		error = false,
		description = '',
		className = ''
	} = $props();
</script>

<div class={`datepicker-field ${className}`}>
	<DatePicker.Root bind:value weekdayFormat="short" fixedWeeks={true}>
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
						<DatePicker.PrevButton class="datepicker-nav-btn">
							<CaretLeft class="datepicker-icon" />
						</DatePicker.PrevButton>

						<DatePicker.Heading class="datepicker-heading" />

						<DatePicker.NextButton class="datepicker-nav-btn">
							<CaretRight class="datepicker-icon" />
						</DatePicker.NextButton>
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
	</DatePicker.Root>

	{#if helperText}
		<p class={`helper-text ${error ? 'error' : ''}`}>{helperText}</p>
	{/if}
</div>

<style>
	.datepicker-field {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.helper-text {
		font-size: 12px;
		color: #666;
	}
	.helper-text.error {
		color: #d32f2f;
	}
</style>
