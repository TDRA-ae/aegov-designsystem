#!/bin/bash
set -e
ROOT="/Users/anis/Sites/aegov-designsystem3"

echo "Publishing @aegov/designsystem..."
(cd "$ROOT/packages/designsystem" && npm publish --ignore-scripts)

echo "Publishing @aegov/designsystem-react..."
(cd "$ROOT/packages/designsystem-react" && npm publish --ignore-scripts)

echo "Publishing @aegov/designsystem-vue..."
(cd "$ROOT/packages/designsystem-vue" && npm publish --ignore-scripts)

echo "Publishing @aegov/designsystem-angular..."
(cd "$ROOT/packages/designsystem-angular/dist/component-library" && npm publish --ignore-scripts)

echo "All packages published successfully."
