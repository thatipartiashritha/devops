FROM python:3.10-slim

ENV FLASK_RUN_HOST=0.0.0.0

WORKDIR /app

RUN pip install --no-cache-dir pipenv

COPY Pipfile Pipfile.lock ./

RUN pipenv install --system --deploy

COPY . .

EXPOSE 5000

CMD ["python", "-m", "flask", "--app", "__init__:app", "run", "--host=0.0.0.0", "--port=5000"]