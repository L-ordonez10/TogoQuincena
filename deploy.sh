#!/bin/bash

# Quick deployment script for TogoQuincena
# Usage: ./deploy.sh

set -e

echo "🚀 Starting deployment process..."

# Check if .env.prod exists
if [ ! -f .env.prod ]; then
    echo "❌ Error: .env.prod file not found!"
    echo "Please create .env.prod from .env.production template"
    exit 1
fi

# Check if SSL certificates exist
if [ ! -f nginx/ssl/fullchain.pem ] || [ ! -f nginx/ssl/privkey.pem ]; then
    echo "⚠️  Warning: SSL certificates not found in nginx/ssl/"
    echo "Please run certbot and copy certificates before continuing"
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo "📦 Pulling latest changes from git..."
git pull

echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.prod.yml down

echo "🏗️  Building and starting containers..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d --build

echo "⏳ Waiting for services to be ready..."
sleep 10

echo "🔍 Checking container status..."
docker-compose -f docker-compose.prod.yml ps

echo ""
echo "✅ Deployment completed!"
echo ""
echo "📊 Service URLs:"
echo "   Frontend: https://$(grep DOMAIN .env.prod | cut -d= -f2)"
echo "   Backend API: https://$(grep DOMAIN .env.prod | cut -d= -f2)/api"
echo "   Health Check: https://$(grep DOMAIN .env.prod | cut -d= -f2)/health"
echo ""
echo "📋 Useful commands:"
echo "   View logs: docker-compose -f docker-compose.prod.yml logs -f"
echo "   Restart: docker-compose -f docker-compose.prod.yml restart"
echo "   Stop: docker-compose -f docker-compose.prod.yml down"
echo ""
echo "🔒 Don't forget to check SECURITY_CHECKLIST.md"
