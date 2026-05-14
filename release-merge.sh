#!/bin/bash
###
 # @Author:FeiFeiSeal
 # @Date:2025-04-23 17:13:22
 # @LastEditors:FeiFeiSeal
 # @LastEditTime:2025-04-24 18:25:33
 # @Description:
###
# Exit immediately if any command fails

npm version patch --no-git-tag-version
set -e

VERSION=$(jq -r '.version' package.json)

if [ -z "$1" ]; then
  echo "沒有提供版本號，預設使用 package.json 的版本號: $VERSION"
else
  VERSION="$1"
fi

echo ""
echo -e "\033[1;37;43m版本號: $VERSION\033[0m"
echo ""

git add package.json
git add package-lock.json
git commit -m "[publish]: version $VERSION"
git tag $VERSION
echo "⚙️  切換到 main 分支..."
git checkout main

echo "⚙️  切換到 release 分支..."
git checkout release

echo "🔄 合併 main 分支到 release 分支，版本號: $VERSION"
git merge main -m "[release]: version $VERSION" --no-ff

echo "🚀 推送所有分支與 tags 到遠端..."
git push --all
git push --tags

echo "🔄 切換回 main 分支..."
git checkout main

echo "✅ 完成！版本 $VERSION 已經合併並推送。"
