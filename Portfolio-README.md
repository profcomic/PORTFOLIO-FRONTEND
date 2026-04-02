# ANTHONNEY MWANZAH - Portfolio Website

A modern, full-stack portfolio website built with Django REST API backend and Next.js frontend.

## 📁 Project Structure

```
Portfolio-README.md          # This file
Portfolio-Backend/            # Django REST API
├── professor/               # Django app
├── requirements.txt         # Python dependencies
├── manage.py               # Django management script
└── ...                     # Other Django files

Portfolio-Frontend/           # Next.js React App
├── components/             # React components
├── pages/                  # Next.js pages
├── package.json            # Node.js dependencies
└── ...                     # Other Next.js files
```

## 🚀 Getting Started

### Backend Setup

1. Navigate to backend directory:
```bash
cd Portfolio-Backend
```

2. Create and activate virtual environment:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run migrations:
```bash
python manage.py migrate
```

5. Create superuser:
```bash
python manage.py createsuperuser
```

6. Start development server:
```bash
python manage.py runserver
```

Backend will be available at: `http://127.0.0.1:8000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd Portfolio-Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

Frontend will be available at: `http://localhost:3000`

## 🛠️ Technologies Used

### Backend
- **Django 5.2.2** - Web framework
- **Django REST Framework** - API development
- **SQLite** - Database
- **Pillow** - Image handling
- **django-cors-headers** - CORS support

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons

## 📋 Features

- ✅ **Project Management**: Add, edit, delete projects
- ✅ **Image Upload**: Project images with fallbacks
- ✅ **Custom Admin**: Modern admin interface
- ✅ **Responsive Design**: Works on all devices
- ✅ **Dark Mode**: Theme switching
- ✅ **Animations**: Smooth transitions and effects
- ✅ **SEO Optimized**: Meta tags and structured data

## 🔧 Admin Access

### Django Admin (Default)
- URL: `http://127.0.0.1:8000/admin`
- Use superuser credentials

### Custom Admin Panel
- URL: `http://127.0.0.1:8000/admin-dashboard/admin/`
- Modern UI with Bootstrap 5
- Enhanced project management

## 📝 API Endpoints

- `GET /api/projects/` - List all projects
- `POST /api/projects/` - Create project
- `GET /api/github-status/` - GitHub stats
- `POST /api/contact/` - Contact form

## 🎨 Customization

### Adding Projects
1. Access admin panel
2. Navigate to Projects section
3. Fill in project details:
   - Title & Description
   - Tech Stack (comma-separated)
   - GitHub URL & Live Demo
   - Project Image
   - Project Date

### Styling
- Frontend: Edit `Portfolio-Frontend/tailwind.config.js`
- Backend: Edit `Portfolio-Backend/professor/templates/admin/`

## 🚀 Deployment

### Backend Deployment
1. Set environment variables
2. Run `python manage.py collectstatic`
3. Configure web server (Nginx + Gunicorn)

### Frontend Deployment
1. Run `npm run build`
2. Deploy to Vercel, Netlify, or similar

## 📞 Contact

- **Email**: professorcomic1@gmail.com
- **Phone**: +254 113 088 424
- **Location**: Mombasa, Kenya

## 📄 License

This project is open source and available under the MIT License.
