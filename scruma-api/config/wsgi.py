import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

media_root = os.getenv("MEDIA_ROOT", "")
if media_root:
    try:
        os.makedirs(media_root, exist_ok=True)
    except OSError:
        # ако је read-only или није доступно, игнориши; апликација ће радити без upload-а
        pass

application = get_wsgi_application()
