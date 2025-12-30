# Quick Setup Script for SSL Certificates
# Run this on your Lightsail server

# Variables
DOMAIN="yourdomain.com"
EMAIL="your-email@example.com"

# Stop any running containers
docker-compose -f docker-compose.prod.yml down

# Install certbot if not already installed
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    sudo apt update
    sudo apt install certbot -y
fi

# Generate SSL certificates
echo "Generating SSL certificates for $DOMAIN..."
sudo certbot certonly --standalone \
    -d $DOMAIN \
    -d www.$DOMAIN \
    --non-interactive \
    --agree-tos \
    --email $EMAIL

# Copy certificates to nginx directory
echo "Copying certificates..."
sudo cp /etc/letsencrypt/live/$DOMAIN/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/$DOMAIN/privkey.pem nginx/ssl/
sudo chown -R $USER:$USER nginx/ssl
sudo chmod 644 nginx/ssl/*

echo "✅ SSL certificates generated and copied!"
echo ""
echo "📝 Next steps:"
echo "1. Update nginx/nginx.conf with your domain"
echo "2. Update .env.prod with your domain and credentials"
echo "3. Run: docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d"
