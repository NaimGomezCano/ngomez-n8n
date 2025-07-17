#!/bin/bash

# Verifica que se haya pasado un archivo .env como argumento
if [ -z "$1" ]; then
  echo "❌ Debes proporcionar un archivo .env como argumento."
  echo "Ejemplo: ./start-with-env prod.env"
  exit 1
fi

ENV_FILE="$1"

# Verifica si el archivo existe
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Archivo '$ENV_FILE' no encontrado."
  exit 1
fi

# Ejecuta pnpm start en un subshell con las variables de entorno cargadas
(
  set -o allexport
  source "$ENV_FILE"
  set +o allexport

  echo "🚀 Lanzando pnpm start con variables de $ENV_FILE..."
  pnpm start
)

# Ejemplo: 
