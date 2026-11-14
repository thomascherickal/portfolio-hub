# Media folder

Put each recording here as an MP4 (H.264 video, AAC audio), 25 MiB or smaller - the Cloudflare Pages per-file limit.

A 90-second 720p screen recording usually fits. Compress with:

    ffmpeg -i raw.mov -vf "scale=-2:720,fps=30" -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart pr-review.mp4

Make a poster frame (the still shown before play):

    ffmpeg -ss 5 -i pr-review.mp4 -frames:v 1 -vf "scale=-2:720" pr-review.jpg

Then set in data/projects.js:

    links: { video: "media/pr-review.mp4", poster: "media/pr-review.jpg", ... }

Longer videos: upload to YouTube and use  video: "yt:VIDEO_ID"  instead.
