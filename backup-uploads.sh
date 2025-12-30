#!/bin/bash

# Backup script for uploaded files
# Usage: ./backup-uploads.sh

# Configuration
BACKUP_DIR="/home/ubuntu/backups"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=7

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

echo "📦 Creating uploads backup..."

# Create backup of uploads directory
docker cp togo-backend:/app/uploads /tmp/uploads_temp
tar -czf $BACKUP_DIR/backup_uploads_$DATE.tar.gz -C /tmp uploads_temp

# Check if backup was successful
if [ $? -eq 0 ]; then
    echo "✅ Uploads backup created: backup_uploads_$DATE.tar.gz"
    
    # Clean up temp directory
    rm -rf /tmp/uploads_temp
    
    # Delete old backups
    find $BACKUP_DIR -name "backup_uploads_*.tar.gz" -type f -mtime +$RETENTION_DAYS -delete
    echo "🗑️  Old backups (>$RETENTION_DAYS days) deleted"
    
    # Show backup size
    BACKUP_SIZE=$(du -h $BACKUP_DIR/backup_uploads_$DATE.tar.gz | cut -f1)
    echo "📊 Backup size: $BACKUP_SIZE"
else
    echo "❌ Backup failed!"
    rm -rf /tmp/uploads_temp
    exit 1
fi

echo "✅ Uploads backup completed!"
