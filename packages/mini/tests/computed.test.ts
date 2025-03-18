import * as zc from "@zod/core/util";
import * as z from "@zod/mini";
import { expect, test } from "vitest";

test("min/max", () => {
  const a = z.number().check(z.minimum(5), z.minimum(6), z.minimum(7), z.maximum(10), z.maximum(11), z.maximum(12));

  expect(a._zod.computed.minimum).toEqual(7);
  expect(a._zod.computed.maximum).toEqual(10);
});

test("multipleOf", () => {
  const b = z.number().check(z.multipleOf(5));
  expect(b._zod.computed.multipleOf).toEqual(5);
});

test("int64 format", () => {
  const c = z.int64();
  expect(c._zod.computed.format).toEqual("int64");
  expect(c._zod.computed.minimum).toEqual(zc.BIGINT_FORMAT_RANGES.int64[0]);
  expect(c._zod.computed.maximum).toEqual(zc.BIGINT_FORMAT_RANGES.int64[1]);
});

test("int32 format", () => {
  const d = z.int32();
  expect(d._zod.computed.format).toEqual("int32");
  expect(d._zod.computed.minimum).toEqual(zc.NUMBER_FORMAT_RANGES.int32[0]);
  expect(d._zod.computed.maximum).toEqual(zc.NUMBER_FORMAT_RANGES.int32[1]);
});

test("array size", () => {
  const e = z.array(z.string()).check(z.length(5));
  expect(e._zod.computed.length).toEqual(5);
  expect(e._zod.computed.minimum).toEqual(5);
  expect(e._zod.computed.maximum).toEqual(5);
});
