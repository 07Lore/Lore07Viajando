#!/bin/bash
# Script de backup de App.jsx y SearchForm.jsx

# Carpeta de destino
DEST="backups"

# Crear carpeta si no existe
mkdir -p $DEST

# Copiar archivos con fecha y hora
cp src/App.jsx $DEST/App_$(date +"%Y%m%d_%H%M%S").jsx
cp src/components/SearchForm.jsx $DEST/SearchForm_$(date +"%Y%m%d_%H%M%S").jsx

echo "✅ Backup creado en $DEST"

