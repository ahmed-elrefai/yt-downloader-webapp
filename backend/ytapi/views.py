from django.shortcuts import render, redirect
from django.http import FileResponse
from pytube import YouTube
import os

# Create your views here.


def get_thumbnail(request, video_url):
    session = YouTube(video_url)
    thumbnail_url = session.thumbnail_url
    return redirect(thumbnail_url)

def download_video(request, video_url):
    session = YouTube(video_url)
    video_stream = session.streams.get_lowest_resolution()
    return FileResponse(open(video_stream.download(skip_existing=True),'rb'), as_attachment=True)

