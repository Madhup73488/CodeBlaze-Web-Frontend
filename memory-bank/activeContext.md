# Active Context

## Current Work Focus
- **Task**: Fix the issue where a single internship card expands to fill the entire width of the container.
- **Status**: Completed.

## Recent Changes
- Modified `src/components/ForStudents/Internships.css`:
  - Changed the `grid-template-columns` of the `.internships-list` from `repeat(auto-fit, minmax(300px, 1fr))` to `repeat(auto-fill, minmax(300px, 1fr))`.

## Next Steps
- Verify that a single card no longer expands to fill the container.
- No further modifications are planned for this task.

## Important Patterns and Preferences
- **UI/UX**: The user wants a consistent and predictable layout, even when there is only one item in the grid.

## Learnings and Project Insights
- The `auto-fill` and `auto-fit` values for `repeat()` in CSS Grid have different behaviors. `auto-fit` will expand the grid items to fill the available space, while `auto-fill` will create as many columns as can fit, even if there are not enough items to fill them. `auto-fill` is useful in cases where you want to prevent a single item from expanding.
