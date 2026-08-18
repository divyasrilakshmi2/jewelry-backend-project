# Jewelry Backend API

A Django REST Framework backend for a jewelry web application.

## Features

- Product CRUD APIs
- Category APIs
- Products by category
- Price range filtering
- Base metal filtering
- Sorting by latest, low price, high price and popularity
- Serializer validation
- JWT authentication
- Admin-only product creation, update and deletion
- SQLite database for local testing
- Sample jewelry data

## 1. Setup

Create and activate a virtual environment.

### Windows

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### macOS/Linux

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## 2. Database

```bash
python manage.py migrate
python manage.py createsuperuser
```

## 3. Add sample data

```bash
python manage.py seed_data
```

## 4. Run

```bash
python manage.py runserver
```

API base URL:

http://127.0.0.1:8000/api/

Admin:

http://127.0.0.1:8000/admin/

## API Endpoints

### Products

GET `/api/products/`

GET `/api/products/<id>/`

POST `/api/products/` - admin authentication required

PUT `/api/products/<id>/` - admin authentication required

DELETE `/api/products/<id>/` - admin authentication required

### Categories

GET `/api/categories/`

GET `/api/categories/<id>/products/`

### Filters

`/api/products/?min_price=100&max_price=1000`

`/api/products/?metal=gold`

`/api/products/?sort=latest`

`/api/products/?sort=price_low`

`/api/products/?sort=price_high`

`/api/products/?sort=popularity`

Filters can be combined:

`/api/products/?min_price=1000&max_price=10000&metal=gold&sort=price_low`

### Authentication

POST `/api/users/register/`

POST `/api/users/login/`

POST `/api/users/refresh/`

Login returns JWT access and refresh tokens.

Use the access token in Postman:

Authorization -> Bearer Token -> paste access token

## Deployment

The project includes `Procfile`, `runtime.txt`, WhiteNoise and Gunicorn for deployment platforms such as Render.

Before public deployment, set a secure `SECRET_KEY`, `DEBUG=False`, and configure `ALLOWED_HOSTS`.
