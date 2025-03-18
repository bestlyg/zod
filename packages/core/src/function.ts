import { parse, parseAsync } from "./parse.js";
import type * as schemas from "./schemas.js";
import { $ZodTuple } from "./schemas.js";
import type * as util from "./util.js";

//////////////////////////////////////////
//////////////////////////////////////////
//////////                      //////////
//////////     $ZodFunction     //////////
//////////                      //////////
//////////////////////////////////////////
//////////////////////////////////////////
export interface $ZodFunctionDef /* extends schemas.$ZodTypeDef */ {
  type: "function";
  input: $ZodFunctionArgs | null;
  output: schemas.$ZodType | null;
}

export type $ZodFunctionArgs = schemas.$ZodType<unknown[], unknown[]>;

export type $InferInnerFunctionType<Args extends $ZodFunctionArgs, Returns extends schemas.$ZodType> = (
  ...args: Args["_zod"]["output"]
) => Returns["_zod"]["input"];

export type $InferInnerFunctionTypeAsync<Args extends $ZodFunctionArgs, Returns extends schemas.$ZodType> = (
  ...args: Args["_zod"]["output"]
) => util.MaybeAsync<Returns["_zod"]["input"]>;

export type $InferOuterFunctionType<Args extends $ZodFunctionArgs, Returns extends schemas.$ZodType> = (
  ...args: Args["_zod"]["input"]
) => Returns["_zod"]["output"];

export type $InferOuterFunctionTypeAsync<Args extends $ZodFunctionArgs, Returns extends schemas.$ZodType> = (
  ...args: Args["_zod"]["input"]
) => util.MaybeAsync<Returns["_zod"]["output"]>;

export class $ZodFunction<
  Args extends $ZodFunctionArgs = $ZodFunctionArgs,
  Returns extends schemas.$ZodType = schemas.$ZodType,
> {
  _def: $ZodFunctionDef;
  _input!: $InferInnerFunctionType<Args, Returns>;
  _output!: $InferOuterFunctionType<Args, Returns>;

  constructor(def: $ZodFunctionDef) {
    this._def = def;
  }

  implement<F extends $InferInnerFunctionType<Args, Returns>>(func: F): $InferOuterFunctionType<Args, Returns> {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }
    return ((...args: any[]) => {
      const parsedArgs = this._def.input ? parse(this._def.input, args) : args;
      if (!Array.isArray(parsedArgs)) {
        throw new Error("Invalid arguments schema: not an array or tuple schema.");
      }
      const output = func(...parsedArgs);
      return this._def.output ? parse(this._def.output, output) : output;
    }) as any;
  }

  implementAsync<F extends $InferInnerFunctionTypeAsync<Args, Returns>>(
    func: F
  ): $InferOuterFunctionTypeAsync<Args, Returns> {
    if (typeof func !== "function") {
      throw new Error("implement() must be called with a function");
    }

    return (async (...args: any[]) => {
      const parsedArgs = this._def.input ? await parseAsync(this._def.input, args) : args;
      if (!Array.isArray(parsedArgs)) {
        throw new Error("Invalid arguments schema: not an array or tuple schema.");
      }
      const output = await func(...parsedArgs);
      return this._def.output ? parseAsync(this._def.output, output) : output;
    }) as any;
  }

  input<const Items extends util.TupleItems, const Rest extends schemas.$ZodType | null = null>(
    args: Items,
    rest?: Rest
  ): $ZodFunction<schemas.$ZodTuple<Items, Rest>, Returns>;
  input<NewArgs extends $ZodFunctionArgs>(args: NewArgs): $ZodFunction<NewArgs, Returns>;
  input(...args: any[]): $ZodFunction<any, Returns> {
    if (Array.isArray(args[0])) {
      return new $ZodFunction({
        type: "function",
        input: new $ZodTuple({
          type: "tuple",
          items: args[0],
          rest: args[1],
        }),
        output: this._def.output,
      });
    }
    return new $ZodFunction({
      type: "function",
      input: args[0],
      output: this._def.output,
    });
  }

  output<NewReturns extends schemas.$ZodType>(output: NewReturns): $ZodFunction<Args, NewReturns> {
    return new $ZodFunction({
      type: "function",
      input: this._def.input,
      output,
    });
  }
}

export interface $ZodFunctionParams<I extends $ZodFunctionArgs, O extends schemas.$ZodType> {
  input?: I;
  output?: O;
}
function _function<In extends $ZodFunctionArgs = $ZodFunctionArgs, Out extends schemas.$ZodType = schemas.$ZodType>(
  params?: $ZodFunctionParams<In, Out>
): $ZodFunction<In, Out> {
  return new $ZodFunction({
    type: "function",
    input: params?.input ?? null,
    output: params?.output ?? null,
  });
}

export { _function as function };
