import {PrismaClient} from '@prisma/client';
import {Decimal} from '@prisma/client/runtime';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
}

const serializeDecimal = (object) => {
    Object.keys(object).forEach((key) => {
        if (Decimal.isDecimal(object[key])) {
            object[key] = object[key].toNumber();
        }
        if (object[key] instanceof Date) {
            object[key] = object[key].toISOString();
        }
    });
    return object;
};

prisma.$use(async (params, next) => {
    let result = await next(params);

    if (!result) return result;

    if (result instanceof Array) {
        result.forEach((item) => {
            serializeDecimal(item);
        });
    } else {
        result = serializeDecimal(result);
    }

    return result;
});

export default prisma;
