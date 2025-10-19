# syntax=docker/dockerfile:1

##################################### FOR DEVELOPMENT

FROM node:24-slim

WORKDIR /app

RUN groupadd -r app && useradd -m -r -g app -s /bin/bash app

COPY package*.json ./

USER root

RUN chown -R app:app /app

USER app

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

##################################### FOR PRODUCTION

# ARG NODE_VERSION=20.18.1

# ################################################################################

# FROM node:${NODE_VERSION}-alpine AS base
# WORKDIR /usr/src/app


# ################################################################################

# FROM base AS deps
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci --omit=dev

# ################################################################################

# FROM deps AS build
# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     npm ci
# COPY public ./public
# COPY . .
# RUN npm run build

# ################################################################################

# FROM base AS final
# ENV NODE_ENV=production
# USER node
# COPY package.json .
# COPY --from=deps /usr/src/app/node_modules ./node_modules
# COPY --from=build /usr/src/app/.next ./.next
# COPY --from=build /usr/src/app/public ./public
# EXPOSE 3000
# CMD ["npm", "start"]
