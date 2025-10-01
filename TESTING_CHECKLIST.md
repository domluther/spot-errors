# Testing Checklist for Error Spotter Migration

## Pre-Testing Setup
- [ ] Upgrade Node.js to version 20.19+ or 22.12+ (currently on 20.17.0)
- [ ] Run `npm run dev` to start the development server
- [ ] Navigate to http://localhost:5173 (or the port shown)

## Core Functionality Tests

### Navigation
- [ ] Home page displays "Error Spotter" card with 🔍 emoji
- [ ] Click on Error Spotter card navigates to /error-spotter route
- [ ] Mode menu at top shows all quiz modes

### Question Display
- [ ] Question description appears in blue highlighted box
- [ ] Code block displays with proper formatting
- [ ] Line numbers (01, 02, etc.) appear on left side
- [ ] Code is readable and properly aligned

### Input Fields
- [ ] Line number input accepts numbers
- [ ] Line number input has min/max constraints (1 to code length)
- [ ] Error type dropdown shows "Syntax Error" and "Logic Error" options
- [ ] Correction input accepts text
- [ ] All inputs are properly labeled (1, 2, 3)

### Answer Submission
- [ ] Submit button is disabled when inputs are empty
- [ ] Submit button works when all fields are filled
- [ ] Pressing Enter in any input field submits (if inputs are filled)
- [ ] Cannot submit after already submitting (inputs disabled)

### Scoring and Feedback
- [ ] Correct line number shows green checkmark and +1 point
- [ ] Incorrect line number shows red X and correct answer
- [ ] Correct error type shows green checkmark and +1 point
- [ ] Incorrect error type shows red X and correct type
- [ ] Correct correction shows green checkmark and +1 point
- [ ] Incorrect correction shows red X and example answer
- [ ] Score displays as X/3 (where X is 0-3)
- [ ] Partial credit works (can get 1/3, 2/3, or 3/3)

### Feedback Colors
- [ ] 3/3 score: Green background
- [ ] 1-2/3 score: Yellow background
- [ ] 0/3 score: Red background

### Stats Tracking
- [ ] Points increase after correct answers
- [ ] Streak increases on correct answers (3/3)
- [ ] Streak resets on incorrect answers (<3/3)
- [ ] Accuracy percentage updates after each question
- [ ] Stats persist across page refreshes (localStorage)

### Next Question
- [ ] "Next Question" button appears after submitting
- [ ] Click loads a new random question
- [ ] All inputs are cleared and re-enabled
- [ ] Previous feedback disappears
- [ ] Focus returns to line number input

### Edge Cases
- [ ] Try various error types (syntax vs logic)
- [ ] Test questions with multiple valid corrections
- [ ] Test whitespace handling in correction field
- [ ] Test quote normalization (single vs double quotes)
- [ ] Verify all 32 questions can appear randomly

## Visual/UX Tests
- [ ] Component is centered and properly sized
- [ ] Responsive design works on different screen sizes
- [ ] Animations work smoothly (fade-in for feedback)
- [ ] Colors match the original site aesthetic
- [ ] Font is monospace for code blocks
- [ ] Buttons have hover effects
- [ ] Layout doesn't break with long code lines

## Integration Tests
- [ ] Stats button in header works
- [ ] Stats modal shows Error Spotter data
- [ ] Mode menu highlights current mode
- [ ] Can navigate to other modes and back
- [ ] Score persists when switching modes

## Known Limitations (from legacy site)
- [ ] No Practice/Test mode toggle (continuous practice mode only)
- [ ] No 10-question test with progress bar
- [ ] No final results screen
- [ ] No question counter

These features can be added later if needed.

## Clean Up Tasks (After Successful Testing)
- [ ] Consider deleting old_datatypes.tsx
- [ ] Consider deleting old_constructs.tsx
- [ ] Consider deleting old_operators.tsx
- [ ] Consider deleting old_champion.tsx
- [ ] Consider deleting legacy/index.html (or keep for reference)

## Notes
- The route tree will auto-generate when the dev server runs
- TypeScript errors about route path are expected until first run
- All code changes are complete and ready for testing
