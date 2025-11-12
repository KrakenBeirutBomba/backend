import { Decimal } from "@prisma/client/runtime/library";

export const toDecimal = (x: string) => new Decimal(x);
export const mapPrice = (p: any) => (p?.toFixed ? p.toFixed(2) : p);
