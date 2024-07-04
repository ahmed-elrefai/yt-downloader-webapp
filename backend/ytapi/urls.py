from django.urls import path
from .views import get_thumbnail, download_video

urlpatterns = [
    path("get-thumbnail/<path:video_url>", get_thumbnail),
    path("download-video/<path:video_url>", download_video)
]