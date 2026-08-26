FROM node:20-alpine AS builder
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

#Install app dependencies
RUN npm install

# Copy the rest of our app into the container
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Set port environment variable
ENV PORT=9000

#Expose the port our computer can access it
EXPOSE 9000

CMD ["npm", "start"]
