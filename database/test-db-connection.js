// Test script to verify MongoDB connection
// Run with: node test-db-connection.js

require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

async function testConnection() {
  console.log('🔍 Testing MongoDB connection...');
  console.log('📍 MONGODB_URI:', MONGODB_URI ? '✓ Found' : '✗ Not found');

  if (!MONGODB_URI) {
    console.error('❌ ERROR: MONGODB_URI is not defined in .env file');
    process.exit(1);
  }

  try {
    console.log('\n⏳ Attempting to connect to MongoDB...');

    await mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });

    console.log('✅ SUCCESS! Connected to MongoDB');
    console.log('📊 Connection details:');
    console.log('   - Database name:', mongoose.connection.name);
    console.log('   - Host:', mongoose.connection.host);
    console.log('   - Port:', mongoose.connection.port);
    console.log('   - Ready state:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not connected');

    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📚 Collections in database:', collections.length);
    if (collections.length > 0) {
      collections.forEach(col => {
        console.log('   -', col.name);
      });
    } else {
      console.log('   (No collections yet - database is empty)');
    }

  } catch (error) {
    console.error('\n❌ ERROR: Failed to connect to MongoDB');
    console.error('Error details:', error.message);

    if (error.message.includes('authentication failed')) {
      console.error('\n💡 Tip: Check your username and password in MONGODB_URI');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ETIMEDOUT')) {
      console.error('\n💡 Tip: Check your internet connection and MongoDB cluster status');
    }

    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n🔌 Connection closed');
  }
}

testConnection();
