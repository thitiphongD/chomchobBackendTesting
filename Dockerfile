FROM node:18-alpine AS builder

# ติดตั้ง mariadb client 
RUN apk add --no-cache mariadb-client

# ตั้งค่า working directory ให้เป็น /app
WORKDIR /app

# Copy package.json และ package-lock.json (หากมี)
COPY package*.json ./

# ติดตั้งพึกได้จี Node.js
RUN npm install

# Copy ไฟล์ที่เหลือทั้งหมดลงใน /app  
COPY . .

# Expose port สำหรับ Node app
EXPOSE 3000

# คำสั่งเริ่ม Node app
CMD ["npm", "start"]