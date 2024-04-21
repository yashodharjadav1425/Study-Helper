import moviepy.editor

video = moviepy.editor.VideoFileClip('java_1.mp4')

audio = video.audio

audio.write_audiofile('audio_java_1.mp3')