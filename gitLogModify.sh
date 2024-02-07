#!/bin/sh
# 之前提交邮箱错误，执行该脚本修改(执行命令在 bash根目录下 => ./gitLogModify.sh)

git filter-branch --env-filter '
WRONG_EMAIL="错误的邮箱"
NEW_NAME="正确的作者名"
NEW_EMAIL="正确的邮箱"

if [ "$GIT_COMMITTER_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_COMMITTER_NAME="$NEW_NAME"
    export GIT_COMMITTER_EMAIL="$NEW_EMAIL"
fi
if [ "$GIT_AUTHOR_EMAIL" = "$WRONG_EMAIL" ]
then
    export GIT_AUTHOR_NAME="$NEW_NAME"
    export GIT_AUTHOR_EMAIL="$NEW_EMAIL"
fi
' --tag-name-filter cat -- --branches --tags
