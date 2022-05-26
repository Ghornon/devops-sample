FROM node:14
WORKDIR /app
COPY . ./
RUN npm install && npm run build
ENV NODE_ENV=production
ENV PORT=8080
ENV FORCE_COLOR=1
EXPOSE 8080
CMD ["npm", "start"]