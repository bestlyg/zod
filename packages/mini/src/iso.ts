import * as core from "@zod/core";
import * as schemas from "./schemas.js";

// iso time
export interface ZodMiniISODateTime extends schemas.ZodMiniStringFormat<"iso_datetime"> {
  _zod: core.$ZodISODateTimeInternals;
}
export const ZodMiniISODateTime: core.$constructor<ZodMiniISODateTime> = core.$constructor(
  "$ZodISODateTime",
  (inst, def) => {
    core.$ZodISODateTime.init(inst, def);
    schemas.ZodMiniStringFormat.init(inst, def);
  }
);
export function datetime(params?: string | core.$ZodISODateTimeParams): ZodMiniISODateTime {
  return core._isoDateTime(ZodMiniISODateTime, params);
}

// iso date
export interface ZodMiniISODate extends schemas.ZodMiniStringFormat<"iso_date"> {
  _zod: core.$ZodISODateInternals;
}
export const ZodMiniISODate: core.$constructor<ZodMiniISODate> = core.$constructor("$ZodISODate", (inst, def) => {
  core.$ZodISODate.init(inst, def);
  schemas.ZodMiniStringFormat.init(inst, def);
});
export function date(params?: string | core.$ZodISODateParams): ZodMiniISODate {
  return core._isoDate(ZodMiniISODate, params);
}

// iso time
export interface ZodMiniISOTime extends schemas.ZodMiniStringFormat<"iso_time"> {
  _zod: core.$ZodISOTimeInternals;
}
export const ZodMiniISOTime: core.$constructor<ZodMiniISOTime> = core.$constructor("$ZodISOTime", (inst, def) => {
  core.$ZodISOTime.init(inst, def);
  schemas.ZodMiniStringFormat.init(inst, def);
});
export function time(params?: string | core.$ZodISOTimeParams): ZodMiniISOTime {
  return core._isoTime(ZodMiniISOTime, params);
}

// iso duration
export interface ZodMiniISODuration extends schemas.ZodMiniStringFormat<"duration"> {
  _zod: core.$ZodISODurationInternals;
}
export const ZodMiniISODuration: core.$constructor<ZodMiniISODuration> = core.$constructor(
  "$ZodISODuration",
  (inst, def) => {
    core.$ZodISODuration.init(inst, def);
    schemas.ZodMiniStringFormat.init(inst, def);
  }
);
export function duration(params?: string | core.$ZodISODurationParams): ZodMiniISODuration {
  return core._isoDuration(ZodMiniISODuration, params);
}
