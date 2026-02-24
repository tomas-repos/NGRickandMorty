## Ejecutar localmente con Docker

1. Construir la imagen:
   docker build -t ngrickandmorty-app .

2. Ejecutar el contenedor:
   docker run --rm -p 8080:80 --name ngrm ngrickandmorty-app

3. Probar desde otra terminal:
   # En Linux/macOS o Git Bash/WSL
   curl -I http://localhost:8080

   # En PowerShell (Windows) usa:
   curl.exe -I http://localhost:8080
   # o
   Invoke-WebRequest -Uri http://localhost:8080 -Method Head

4. Abrir en el navegador:
   http://localhost:8080

5. Comandos de diagnóstico:
   docker ps
   docker logs -f ngrm
   docker inspect ngrm --format '{{.State.Status}} {{.NetworkSettings.Ports}}'
