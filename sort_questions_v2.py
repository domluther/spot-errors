#!/usr/bin/env python3
import re
import json

# Read the file
with open('src/lib/questionData.ts', 'r') as f:
    content = f.read()

# Find array bounds
start_marker = 'export const errorSpotterQuestions: ErrorSpotterQuestion[] = ['
end_marker_pattern = r'^\];$'

lines = content.split('\n')
start_idx = None
end_idx = None

for i, line in enumerate(lines):
    if start_marker in line:
        start_idx = i
    if start_idx is not None and re.match(end_marker_pattern, line.strip()):
        end_idx = i
        break

print(f"Found array from line {start_idx} to {end_idx}")

# Extract everything before and after the array
before_array = '\n'.join(lines[:start_idx + 1])
after_array = '\n'.join(lines[end_idx:])

# Parse each question object
questions = []
i = start_idx + 1
while i < end_idx:
    line = lines[i]
    
    # Skip empty lines and comments
    if not line.strip() or line.strip().startswith('//'):
        i += 1
        continue
    
    # Start of a question object
    if line.strip() == '{':
        question_lines = [line]
        brace_count = 1
        i += 1
        
        # Collect all lines until we close the object
        while i < end_idx and brace_count > 0:
            line = lines[i]
            question_lines.append(line)
            brace_count += line.count('{') - line.count('}')
            i += 1
        
        # Extract category from the question text
        full_text = '\n'.join(question_lines)
        cat_match = re.search(r'category:\s*"([^"]+)"', full_text)
        
        if cat_match:
            category = cat_match.group(1)
            questions.append({
                'category': category,
                'lines': question_lines
            })
            print(f"Parsed question {len(questions)} with category: {category}")
        else:
            print(f"WARNING: Could not find category in question at line {i}")
    else:
        i += 1

# Category order
category_order = [
    "input-output",
    "operators",
    "variables",
    "selection",
    "strings",
    "iteration-for",
    "iteration-while",
    "iteration-do-until",
    "switch",
    "arrays",
    "subprograms",
    "files",
]

# Sort questions
def get_category_index(q):
    try:
        return category_order.index(q['category'])
    except ValueError:
        print(f"WARNING: Unknown category: {q['category']}")
        return 999

sorted_questions = sorted(questions, key=get_category_index)

# Print stats
print(f"\n✅ Total questions parsed: {len(sorted_questions)}")
category_counts = {}
for q in sorted_questions:
    cat = q['category']
    category_counts[cat] = category_counts.get(cat, 0) + 1

print("\nQuestions per category:")
for cat in category_order:
    count = category_counts.get(cat, 0)
    print(f"  {cat}: {count}")

# Build the new array content
new_array_lines = []
current_category = None

for q in sorted_questions:
    # Add category header if this is a new category
    if q['category'] != current_category:
        new_array_lines.append(f"\t// ========== {q['category'].upper()} ==========")
        current_category = q['category']
    
    # Add the question lines
    new_array_lines.extend(q['lines'])

# Combine everything
final_content = before_array + '\n' + '\n'.join(new_array_lines) + '\n' + after_array

# Write the file
with open('src/lib/questionData.ts', 'w') as f:
    f.write(final_content)

print("\n✅ File sorted and written successfully!")
