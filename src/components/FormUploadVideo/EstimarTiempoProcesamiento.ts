export function estimarTiempoProcesamiento(
  duracion: number,
  factor = 2.5
): string {
  const tiempoEstimado = duracion * factor;
  const minutos = Math.floor(tiempoEstimado / 60);
  const segundos = Math.round(tiempoEstimado % 60);

  if (minutos === 0) {
    return `⏱️ Este video tardará aproximadamente ${segundos} segundos en procesarse (puede variar).`;
  } else {
    return `⏱️ Este video tardará aproximadamente ${minutos} minutos y ${segundos} segundos en procesarse (puede variar).`;
  }
}


export function estimarSegundosDeProcesamiento(
  duracion: number,
  factor = 2.5
): number {
  const tiempoEstimadoEnSegundos = duracion * factor;
  return Math.round(tiempoEstimadoEnSegundos * 1000); // en milisegundos
}
