# Django CORS Configuration for Next.js Frontend

## 1. Install Required Packages
```bash
pip install django-cors-headers
```

## 2. Update Django Settings (settings.py)

```python
INSTALLED_APPS = [
    # ... your existing apps
    'corsheaders',
]

# Add CORS middleware
MIDDLEWARE = [
    # ... your existing middleware
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
]

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://yourdomain.com",  # Your production domain
]

CORS_ALLOW_CREDENTIALS = True

# Optional: Allow all headers and methods
CORS_ALLOW_ALL_ORIGINS = True  # For development only
CORS_ALLOW_HEADERS = ['*']
CORS_ALLOW_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
```

## 3. Update URLs (urls.py)

```python
from django.urls import path, include
from django.contrib import admin
from django.http import JsonResponse

def csrf_token_view(request):
    return JsonResponse({'csrfToken': get_token(request)})

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        # Your app URLs
        path('contact/', your_contact_view, name='contact'),
        path('projects/', your_projects_view, name='projects'),
        path('about/', your_about_view, name='about'),
        path('csrf-token/', csrf_token_view, name='csrf-token'),
    ]),
]
```

## 4. CSRF Token Setup

```python
# In your views.py
from django.views.decorators.csrf import ensure_csrf_cookie
from django.middleware.csrf import get_token

@ensure_csrf_cookie
def your_view(request):
    # Your view logic here
    return render(request, 'template.html', context)
```

## 5. Frontend Usage

The frontend utilities are already set up in `lib/api.ts` with:
- CSRF token handling
- Proper error handling
- TypeScript interfaces
- Environment variable support

## 6. Development Workflow

1. Copy `.env.example` to `.env.local` (gitignored)
2. Start Django backend: `python manage.py runserver`
3. Start Next.js frontend: `npm run dev`
4. Frontend will connect to `http://localhost:8000/api`
