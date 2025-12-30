#!/bin/bash

# Backup script for TogoQuincena production database
# Usage: ./backup-db.sh

# Configuration
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

# Load environment variables
if [ -f .env.prod ]; then
    export $(grep -v '^#' .env.prod | xargs)
else
    echo "❌ Error: .env.prod file not found!"
    exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

echo "📦 Creating database backup..."

# Create backup
docker exec togo-mysql mysqldump \
    -u root \
    -p${MYSQL_ROOT_PASSWORD} \
    ${DB_DATABASE} \
    > $BACKUP_DIR/backup_${DB_DATABASE}_$DATE.sql

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "✅ Backup created successfully: backup_${DB_DATABASE}_$DATE.sql"
    
    # Compress backup
    gzip $BACKUP_DIR/backup_${DB_DATABASE}_$DATE.sql
    echo "📦 Backup compressed: backup_${DB_DATABASE}_$DATE.sql.gz"
    
    # Delete old backups
    find $BACKUP_DIR -name "backup_*.sql.gz" -type f -mtime +$RETENTION_DAYS -delete
    echo "🗑️  Old backups (>$RETENTION_DAYS days) deleted"
    
    # Show backup size
    BACKUP_SIZE=$(du -h $BACKUP_DIR/backup_${DB_DATABASE}_$DATE.sql.gz | cut -f1)
    echo "📊 Backup size: $BACKUP_SIZE"
else
    echo "❌ Backup failed!"
    exit 1
fi

echo "✅ Backup process completed!"
