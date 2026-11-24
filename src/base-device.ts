import type { DeviceStatus, TelemetryPayload } from "./models.js";

/**
 * Base común para todos los dispositivos de la demo.
 *
 * @category Núcleo
 * @remarks
 * Las subclases deben implementar {@link BaseDevice.readMetric}. El método
 * privado `isOperational` no aparecerá cuando TypeDoc se ejecute con
 * `excludePrivate`.
 */
export abstract class BaseDevice {
  /**
   * Identificador único del dispositivo.
   */
  protected readonly id: string;

  /**
   * Estado actual del dispositivo.
   */
  protected status: DeviceStatus;

  /**
   * Instante Unix, en milisegundos, del último cambio de estado.
   */
  protected lastSeenAt: number;

  /**
   * Crea un dispositivo.
   *
   * @param id - Identificador único del dispositivo.
   * @param status - Estado inicial del dispositivo.
   */
  protected constructor(id: string, status: DeviceStatus = "offline") {
    this.id = id;
    this.status = status;
    this.lastSeenAt = Date.now();
  }

  /**
   * Actualiza el estado y la marca de tiempo del dispositivo.
   *
   * @param next - Nuevo estado del dispositivo.
   */
  protected setStatus(next: DeviceStatus): void {
    this.status = next;
    this.lastSeenAt = Date.now();
  }

  /**
   * Comprueba si el dispositivo puede generar lecturas válidas.
   *
   * @returns `true` cuando el estado es `online`.
   */
  private isOperational(): boolean {
    return this.status === "online";
  }

  /**
   * Genera una descripción breve del dispositivo.
   *
   * @returns Una cadena con el identificador y la disponibilidad.
   */
  protected describe(): string {
    return `${this.id}: ${this.isOperational() ? "disponible" : "no disponible"}`;
  }

  /**
   * Obtiene una lectura de telemetría del dispositivo.
   *
   * @returns La lectura con el valor numérico más reciente.
   * @example
   * ```ts
   * class Thermometer extends BaseDevice {
   *   public override readMetric(): TelemetryPayload<number> {
   *     return { value: 21.5, status: "online" };
   *   }
   * }
   * ```
   */
  public abstract readMetric(): TelemetryPayload<number>;
}
