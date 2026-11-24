/**
 * Punto de entrada público de la demo de TypeDoc.
 *
 * @remarks
 * Reúne los modelos y los dispositivos en un único módulo documentado.
 *
 * @module
 */

export type { DeviceStatus, SensorConfig, TelemetryPayload } from "./models.js";
export { BaseDevice } from "./base-device.js";
export { SensorHub } from "./sensor-hub.js";
