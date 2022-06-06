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

const serializeObjectValuesDecimalAndDateRecursively = (object) => {
    if (!object) {
        return object;
    }
    if (object instanceof Decimal) {
        return object.toString();
    }
    if (object instanceof Date) {
        return object.toISOString();
    }
    if (Array.isArray(object)) {
        return object.map((value) => serializeObjectValuesDecimalAndDateRecursively(value));
    }
    if (typeof object === 'object') {
        return Object.entries(object).reduce((acc, [key, value]) => {
            acc[key] = serializeObjectValuesDecimalAndDateRecursively(value);
            return acc;
        }, {});
    }

    return object;
};

prisma.$use(async (params, next) => {
    let result = await next(params);

    if (!result) return result;

    const serialized = serializeObjectValuesDecimalAndDateRecursively(result);
    return serialized;
});

export default prisma;
