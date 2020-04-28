# Use LTS Node environment as build environment
FROM registry.gitlab.com/linumlabs/full-stack-boilerplate/build/core:latest

# Initialize working directory
RUN mkdir -p /app
WORKDIR /app

# COPY --from=builder:latest /build/api/dist .
COPY --from=registry.gitlab.com/linumlabs/full-stack-boilerplate/build/builder:latest /build/api/package.json .
COPY --from=registry.gitlab.com/linumlabs/full-stack-boilerplate/build/builder:latest /build/api/src src
COPY --from=registry.gitlab.com/linumlabs/full-stack-boilerplate/build/builder:latest /build/api/node_modules node_modules
COPY --from=registry.gitlab.com/linumlabs/full-stack-boilerplate/build/builder:latest /build/api/tsconfig.json .
COPY --from=registry.gitlab.com/linumlabs/full-stack-boilerplate/build/builder:latest /build/api/tsconfig.spec.json .

# Serve application
ENTRYPOINT ["yarn", "start"]
EXPOSE 3001