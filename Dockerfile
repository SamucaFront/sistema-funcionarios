FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Usa uma imagem mínima do Nginx
FROM nginx:alpine

# Copia todos os arquivos da pasta atual para o Nginx
COPY . /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80
