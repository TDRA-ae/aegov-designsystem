#!/bin/bash
set -e
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Every publish below uses --ignore-scripts (so prepublishOnly never runs):
# build the production bundles explicitly first. Core must be built before
# the wrappers, whose sources its build regenerates. test:build fails if the
# core dist is a development build (source maps, unminified Tailwind debug).
echo "Building @aegov/designsystem (production)..."
(cd "$ROOT/packages/designsystem" && rm -rf dist loader && npm run test:build)

for pkg in designsystem-react designsystem-vue designsystem-angular; do
  echo "Building @aegov/$pkg..."
  (cd "$ROOT/packages/$pkg" && npm run build)
done

echo "Publishing @aegov/designsystem..."
(cd "$ROOT/packages/designsystem" && npm publish --ignore-scripts)

echo "Publishing @aegov/designsystem-react..."
(cd "$ROOT/packages/designsystem-react" && npm publish --ignore-scripts)

echo "Publishing @aegov/designsystem-vue..."
(cd "$ROOT/packages/designsystem-vue" && npm publish --ignore-scripts)

echo "Publishing @aegov/designsystem-angular..."
(cd "$ROOT/packages/designsystem-angular/dist/component-library" && npm publish --ignore-scripts)

echo "All packages published successfully."
