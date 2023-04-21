import PrismaPlugin from '@pothos/plugin-prisma';
import SchemaBuilder from '@pothos/core';
import { DateResolver } from 'graphql-scalars';
import type PrismaTypes from '@collablist/database/pothos/pothos-types';
import { client } from './db';

export const builder = new SchemaBuilder<{
    Scalars: {
        Date: { Input: Date; Output: Date };
    };
    PrismaTypes: PrismaTypes;
}>({
    plugins: [PrismaPlugin],
    prisma: {
        client
    },
    notStrict:
        'Pothos may not work correctly when strict mode is not enabled in tsconfig.json'
});

builder.queryType({});

builder.addScalarType('Date', DateResolver, {});
