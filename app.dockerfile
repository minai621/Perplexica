FROM node:alpine

# 빌드 시 환경 변수 설정
ARG NEXT_PUBLIC_WS_URL=wss://mj-dev.site/perplexica/ws
ARG NEXT_PUBLIC_API_URL=https://mj-dev.site/perplexica/express-api
ARG PASSWORD=${PASSWORD}

# 런타임 환경 변수 설정
ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

WORKDIR /home/perplexica

# 애플리케이션 코드 복사
COPY ui /home/perplexica/

# 의존성 설치 및 빌드
RUN yarn install --frozen-lockfile
RUN yarn build

# 애플리케이션 시작
CMD ["yarn", "start"]
