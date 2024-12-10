FROM python:3.9-slim

WORKDIR /code

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Añadir /code al PYTHONPATH
ENV PYTHONPATH=/code

CMD ["python", "/code/services/app.py"]