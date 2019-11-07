from django.contrib import admin
from django.conf.urls import include, url
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    path('userauth/', include('userAuth.urls')),
    # path('posts/', include('posts.urls')),
]

# if settings.DEBUG:
#   urlpatterns += static(settings.MEDIA_URL,
#                        document_root=settings.MEDIA_ROOT)
