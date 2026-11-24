/**
 * Modelos de datos de la demo: estados, telemetría y configuración.
 *
 * @remarks
 * Este módulo no depende de ninguna librería externa y define la forma de los
 * datos que intercambian los dispositivos.
 *
 * @module
 */

/**
 * Estados posibles de un dispositivo dentro del hub.
 *
 * @remarks
 * El estado `maintenance` indica que el dispositivo sigue conectado, pero no
 * debe utilizarse para tomar decisiones automáticas.
 *
 * @see {@link SensorConfig}
 */
export type DeviceStatus = "online" | "offline" | "maintenance";

/**
 * Envoltorio inmutable para una lectura de telemetría.
 *
 * @typeParam T - Tipo del valor medido, por ejemplo `number` o `string`.
 * @remarks
 * Todas sus propiedades son de solo lectura para evitar mutaciones accidentales
 * después de publicar una lectura.
 */
export interface TelemetryPayload<T> {
  /**
   * Valor medido por el dispositivo.
   */
  readonly value: T;

  /**
   * Estado del dispositivo en el momento de la lectura.
   *
   * @defaultValue `"offline"`
   */
  readonly status?: DeviceStatus;

  /**
   * Número secuencial de la lectura dentro del dispositivo.
   *
   * @defaultValue `0`
   */
  readonly sequence?: number;

  /**
   * Metadata adicional asociada a la lectura.
   *
   * @defaultValue `undefined`
   */
  readonly tags?: Readonly<Record<string, string>>;
}

/**
 * Ajustes de muestreo de un sensor.
 *
 * @category Modelos
 * @remarks
 * Los valores ausentes se completan con los valores por defecto documentados
 * en cada propiedad.
 *
 * @example
 * ```ts
 * const config: SensorConfig = {
 *   intervalMs: 1000,
 *   unit: "ºC",
 * };
 * ```
 */
export interface SensorConfig {
  /**
   * Periodo de muestreo en milisegundos.
   *
   * @defaultValue `1000`
   */
  readonly intervalMs?: number;

  /**
   * Unidad de medida mostrada en los informes.
   *
   * @defaultValue `""`
   */
  readonly unit?: string;

  /**
   * Indica si se deben registrar mensajes de diagnóstico.
   *
   * @defaultValue `false`
   */
  readonly verbose?: boolean;
}
