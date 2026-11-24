import { BaseDevice } from "./base-device.js";
import type { DeviceStatus, SensorConfig, TelemetryPayload } from "./models.js";

/**
 * Dispositivo concreto que agrupa varias lecturas de sensores.
 *
 * @category Dispositivos
 * @remarks
 * `SensorHub` demuestra sobrecargas, documentación heredada, un método obsoleto
 * y un método genérico.
 *
 * @see {@link BaseDevice}
 */
export class SensorHub extends BaseDevice {
  private readonly config: SensorConfig;
  private readonly samples: number[];
  private sequence: number;

  /**
   * Crea un hub con la configuración indicada.
   *
   * @param id - Identificador único del hub.
   * @param config - Ajustes de muestreo del sensor.
   */
  public constructor(id: string, config: SensorConfig) {
    super(id, "online");
    this.config = config;
    this.samples = [];
    this.sequence = 0;
  }

  /**
   * Devuelve la última lectura registrada.
   *
   * @returns La telemetría con el valor más reciente, o cero si aún no hay lecturas.
   */
  public override readMetric(): TelemetryPayload<number> {
    return {
      value: this.samples.at(-1) ?? 0,
      status: this.status,
      sequence: this.sequence,
    };
  }

  /**
   * Registra una única lectura.
   *
   * @param value - Valor numérico a registrar.
   * @returns La telemetría generada para esa lectura.
   * @throws RangeError si el valor no es finito.
   */
  public sample(value: number): TelemetryPayload<number>;

  /**
   * Registra varias lecturas de una vez.
   *
   * @param values - Valores numéricos a registrar.
   * @returns Una lista de telemetría, una entrada por valor.
   * @throws RangeError si alguno de los valores no es finito.
   */
  public sample(values: readonly number[]): readonly TelemetryPayload<number>[];

  public sample(
    input: number | readonly number[],
  ): TelemetryPayload<number> | readonly TelemetryPayload<number>[] {
    if (typeof input === "number") {
      return this.record(input);
    }

    return input.map((value) => this.record(value));
  }

  /**
   * Añade una lectura al hub.
   *
   * @deprecated Usa {@link SensorHub.sample} en su lugar.
   * @param value - Valor numérico a registrar.
   * @returns La telemetría generada para esa lectura.
   */
  public addSample(value: number): TelemetryPayload<number> {
    return this.sample(value);
  }

  /**
   * Envuelve un valor arbitrario en una carga de telemetría.
   *
   * @typeParam T - Tipo del valor que se quiere enviar.
   * @param value - Valor a enviar.
   * @param status - Estado que se asociará a la carga.
   * @returns Una carga inmutable con el valor proporcionado.
   * @example
   * ```ts
   * const hub = new SensorHub("hub-1", { unit: "ºC" });
   * const payload = hub.wrap("recargando", "maintenance");
   * ```
   */
  public wrap<T>(value: T, status: DeviceStatus = this.status): TelemetryPayload<T> {
    return { value, status, sequence: this.sequence };
  }

  /**
   * Devuelve la configuración activa del hub.
   *
   * @returns La configuración usada al construir el hub.
   */
  public getConfig(): SensorConfig {
    return this.config;
  }

  /**
   * Obtiene una descripción legible del hub.
   *
   * @returns La descripción proporcionada por la clase base.
   */
  public describeHub(): string {
    return this.describe();
  }

  private record(value: number): TelemetryPayload<number> {
    if (!Number.isFinite(value)) {
      throw new RangeError("El valor de la lectura debe ser finito.");
    }

    this.samples.push(value);
    this.sequence += 1;
    return { value, status: this.status, sequence: this.sequence };
  }
}
