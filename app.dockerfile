FROM node:alpine

ARG NEXT_PUBLIC_WS_URL=ws://mj-dev.site/perplexica
ARG NEXT_PUBLIC_API_URL=http://mj-dev.site/perplexica/api
ENV NEXT_PUBLIC_WS_URL=${NEXT_PUBLIC_WS_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV PASSWORD=${PASSWORD}

WORKDIR /home/perplexica

COPY ui /home/perplexica/

RUN yarn install --frozen-lockfile
RUN yarn build

CMD ["yarn", "start"]
