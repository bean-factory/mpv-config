#!/bin/sh
if [[ "$1" == *"watch?v"* ]]; then
youtube-viewer --comments-order=relevance --comments=https://www.youtube.com/$1 --page=1 --no-interactive | ansi2html > /tmp/comments.html && sed -i 's/bold; \}/bold; \} * { font-family: "DejaVu Sans"; \}/g' /tmp/comments.html && sed -i 's/<title>/<title>Comments/g' /tmp/comments.html && sed -i 's/AAAAAA/FFFFFF/g' /tmp/comments.html && google-chrome-stable --app=file:///tmp/comments.html
else
    google-chrome-stable --app=https://twitch.tv/$1/chat
fi
