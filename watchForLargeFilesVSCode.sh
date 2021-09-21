echo fs.inotify.max_user_watches=524288 | sudo tee /etc/sysctl.d/50-max-user-watches.conf && sudo sysctl --system

cat /proc/sys/fs/inotify/max_user_watches
