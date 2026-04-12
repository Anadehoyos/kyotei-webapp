FROM python:3.14.4-alpine

WORKDIR /api

RUN apk add --no-cache curl && \
	curl -LsSf https://astral.sh/uv/install.sh | sh

ENV PATH="/root/.local/bin:$PATH"

COPY ./requirements.txt /api/requirements.txt

RUN uv pip install --system --no-cache -r requirements.txt

CMD ["fastapi", "dev", "main.py", "--host", "0.0.0.0", "--port", "8000"]
