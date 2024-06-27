from django.shortcuts import redirect
from django.http import FileResponse
from pytube import YouTube

# Create your views here.

def get_thumbnail(request, video_url):
    session = YouTube(video_url)
    thumbnail_url = session.thumbnail_url
    return redirect(thumbnail_url)

def download_video(request, video_url):
    session = YouTube(video_url)
    video = session.streams.get_highest_resolution()
    
    # Download the video and save it to a temporary file
    file_path = video.download(skip_existing=True, filename=f"{video.title}-Elreyodev.mp4")
    
    # Create a FileResponse to send the file
    response = FileResponse(open(file_path, 'rb'), as_attachment=True)

    return response
