#!/bin/sh
user=$(echo $USER)
youtube-viewer --comments-order=relevance --comments=https://www.youtube.com/$1 --page=1 --no-interactive | ansi2html > ~/.config/comments.html && sed -i 's/bold; \}/bold; \} * { font-family: "DejaVu Sans"; \}/g' ~/.config/comments.html && sed -i 's/<title>/<title>Comments/g' ~/.config/comments.html && sed -i 's/AAAAAA/FFFFFF/g' ~/.config/comments.html && org.qutebrowser.qutebrowser file:///home/$user/.config/comments.html --qt-arg geometry 580x750
