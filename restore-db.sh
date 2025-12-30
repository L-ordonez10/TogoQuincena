#!/bin/bash

# Restore database from backup
# Usage: ./restore-db.sh <backup_file.sql.gz>

if [ -z "$1" ]; then
    echo "❌ Usage: ./restore-db.sh <backup_file.sql.gz>"
    echo ""
    echo "Available backups:"
    ls -lh /home/ubuntu/backups/backup_*.sql.gz 2>/dev/null || echo "No backups found"
    exit 1
fi

BACKUP_FILE=$1

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Load environment variables
if [ -f .env.prod ]; then
    export $(grep -v '^#' .env.prod | xargs)
else
    echo "❌ Error: .env.prod file not found!"
    exit 1
fi

echo "⚠️  WARNING: This will replace the current database!"
echo "Database: ${DB_DATABASE}"
echo "Backup file: $BACKUP_FILE"
echo ""
read -p "Are you sure you want to continue? (yes/no): " -r
echo

if [[ ! $REPLY =~ ^yes$ ]]; then
    echo "❌ Restore cancelled"
    exit 1
fi

echo "📦 Decompressing backup..."
gunzip -c $BACKUP_FILE > /tmp/restore_temp.sql

echo "🔄 Restoring database..."
docker exec -i togo-mysql mysql \
    -u root \
    -p${MYSQL_ROOT_PASSWORD} \
    ${DB_DATABASE} \
    < /tmp/restore_temp.sql

if [ $? -eq 0 ]; then
    echo "✅ Database restored successfully!"
    rm /tmp/restore_temp.sql
else
    echo "❌ Restore failed!"
    rm /tmp/restore_temp.sql
    exit 1
fi
