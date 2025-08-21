=============================
Create table users
=============================
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(10) DEFAULT 'user',  -- user or admin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

=============================
Create table blogs
=============================
CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,           -- single image optional
    multi_image_urls TEXT[],  -- multiple images optional
    status VARCHAR(20) DEFAULT 'pending',  -- pending / accepted / rejected
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

=============================