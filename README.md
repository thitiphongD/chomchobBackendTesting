# Chomchob Backend Testing

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Docker and Docker Compose installed on your machine
- Git installed on your machine

### Clone the repository

```
git clone https://github.com/thitiphongD/chomchobBackendTesting.git

cd chomchobBackendTesting
```

### Setup environment variables

```
have .env.example copy and rename to file in the root directory
```

### Install dependencies

```
npm install
```

### Run Docker for start mariadb

```
docker-compose down
```

### Stop Docker

```
docker-compose up -d
```

## Postman Collections

https://www.postman.com/lunar-module-astronomer-78429571/workspace/chomchob/request/32128179-a18e67e9-e82f-4a57-a516-a16c66d4fd8e

# Sequelize Database Design

```javascript
const Item = sequelize.define("Item", {
  ItemID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ItemName: Sequelize.STRING,
  Description: Sequelize.STRING,
  Price: Sequelize.FLOAT,
  StartDate: Sequelize.DATE,
  EndDate: Sequelize.DATE,
});

const Purchase = sequelize.define("Purchase", {
  PurchaseID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CustomerID: Sequelize.INTEGER,
  PurchaseDate: Sequelize.DATE,
  Code: Sequelize.STRING,
});

const Promotion = sequelize.define("Promotion", {
  PromotionID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  StartDate: Sequelize.DATE,
  EndDate: Sequelize.DATE,
  DiscountPrice: Sequelize.FLOAT,
});

const Bundle = sequelize.define("Bundle", {
  BundleID: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  BundleName: Sequelize.STRING,
  BundleDescription: Sequelize.STRING,
  BundlePrice: Sequelize.FLOAT,
});

Item.hasMany(Purchase);
Purchase.belongsTo(Item);

Item.hasMany(Promotion);
Promotion.belongsTo(Item);
```

## ERD Diagram

![ERD Diagram](/ERD-database.png)

## แนวคิดในการออกแบบฐานข้อมูล

1. **Item (รายการสินค้า):** การเก็บข้อมูลสินค้า เช่น ชื่อ, รายละเอียด, ราคา, วันที่เปิดขาย, วันที่ปิดขาย เพื่อให้สามารถติดตามและจัดการสินค้า.

2. **Purchase (การซื้อขาย):** เก็บข้อมูลเกี่ยวกับการซื้อขาย เช่น ID การซื้อ, ID ลูกค้า, วันที่ซื้อ, และรหัสที่ลูกค้าได้รับ เพื่อติดตามการทำธุรกรรมของลูกค้า.

3. **Promotion (โปรโมชั่น):** ใช้ในการจัดการโปรโมชั่นที่เกี่ยวข้องกับการขายสินค้า โดยสามารถกำหนดการลดราคาในช่วงเวลาที่กำหนดได้ เพื่อส่งเสริมการขายสินค้าในระบบ.

4. **Bundle (แบบ Bundle):** ใช้ในการจัดการการขายแบบ Bundle ที่เกี่ยวข้องกับการรวมกันของสินค้าในราคาพิเศษ

การออกแบบนี้ช่วยจัดการการซื้อขาย code item สำหรับสินค้าต่าง ๆ ได้อย่างมีประสิทธิภาพ และช่วยให้ผู้ใช้สามารถติดตามและจัดการรายการสินค้า, การซื้อขาย, โปรโมชั่น, และการขายแบบ Bundle
