from django.contrib import admin
from django.urls import path, include

from django.conf import settings
from django.conf.urls.static import static

from main.views import *

urlpatterns = [
    path('', main, name='main'),
    path('pressa/', pressa, name='pressa'),
    path('pravo/', pravo, name='pravo'),
    path('culture/', culture, name='culture'),
    path('news/', news, name='news'),

    # path('login/', login, name='login'),
    # path('logup/', logup, name='logup'),
    # path('profile/', profile, name='profile'),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
