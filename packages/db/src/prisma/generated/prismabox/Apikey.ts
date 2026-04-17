import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ApikeyPlain = t.Object(
  {
    id: t.String(),
    configId: t.String(),
    name: __nullable__(t.String()),
    start: __nullable__(t.String()),
    referenceId: t.String(),
    prefix: __nullable__(t.String()),
    key: t.String(),
    refillInterval: __nullable__(t.Integer()),
    refillAmount: __nullable__(t.Integer()),
    lastRefillAt: __nullable__(t.Date()),
    enabled: __nullable__(t.Boolean()),
    rateLimitEnabled: __nullable__(t.Boolean()),
    rateLimitTimeWindow: __nullable__(t.Integer()),
    rateLimitMax: __nullable__(t.Integer()),
    requestCount: __nullable__(t.Integer()),
    remaining: __nullable__(t.Integer()),
    lastRequest: __nullable__(t.Date()),
    expiresAt: __nullable__(t.Date()),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    permissions: __nullable__(t.String()),
    metadata: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const ApikeyRelations = t.Object({}, { additionalProperties: false });

export const ApikeyPlainInputCreate = t.Object(
  {
    name: t.Optional(__nullable__(t.String())),
    start: t.Optional(__nullable__(t.String())),
    prefix: t.Optional(__nullable__(t.String())),
    key: t.String(),
    refillInterval: t.Optional(__nullable__(t.Integer())),
    refillAmount: t.Optional(__nullable__(t.Integer())),
    lastRefillAt: t.Optional(__nullable__(t.Date())),
    enabled: t.Optional(__nullable__(t.Boolean())),
    rateLimitEnabled: t.Optional(__nullable__(t.Boolean())),
    rateLimitTimeWindow: t.Optional(__nullable__(t.Integer())),
    rateLimitMax: t.Optional(__nullable__(t.Integer())),
    requestCount: t.Optional(__nullable__(t.Integer())),
    remaining: t.Optional(__nullable__(t.Integer())),
    lastRequest: t.Optional(__nullable__(t.Date())),
    expiresAt: t.Optional(__nullable__(t.Date())),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    permissions: t.Optional(__nullable__(t.String())),
    metadata: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const ApikeyPlainInputUpdate = t.Object(
  {
    name: t.Optional(__nullable__(t.String())),
    start: t.Optional(__nullable__(t.String())),
    prefix: t.Optional(__nullable__(t.String())),
    key: t.Optional(t.String()),
    refillInterval: t.Optional(__nullable__(t.Integer())),
    refillAmount: t.Optional(__nullable__(t.Integer())),
    lastRefillAt: t.Optional(__nullable__(t.Date())),
    enabled: t.Optional(__nullable__(t.Boolean())),
    rateLimitEnabled: t.Optional(__nullable__(t.Boolean())),
    rateLimitTimeWindow: t.Optional(__nullable__(t.Integer())),
    rateLimitMax: t.Optional(__nullable__(t.Integer())),
    requestCount: t.Optional(__nullable__(t.Integer())),
    remaining: t.Optional(__nullable__(t.Integer())),
    lastRequest: t.Optional(__nullable__(t.Date())),
    expiresAt: t.Optional(__nullable__(t.Date())),
    createdAt: t.Optional(t.Date()),
    updatedAt: t.Optional(t.Date()),
    permissions: t.Optional(__nullable__(t.String())),
    metadata: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const ApikeyRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const ApikeyRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const ApikeyWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          configId: t.String(),
          name: t.String(),
          start: t.String(),
          referenceId: t.String(),
          prefix: t.String(),
          key: t.String(),
          refillInterval: t.Integer(),
          refillAmount: t.Integer(),
          lastRefillAt: t.Date(),
          enabled: t.Boolean(),
          rateLimitEnabled: t.Boolean(),
          rateLimitTimeWindow: t.Integer(),
          rateLimitMax: t.Integer(),
          requestCount: t.Integer(),
          remaining: t.Integer(),
          lastRequest: t.Date(),
          expiresAt: t.Date(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          permissions: t.String(),
          metadata: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Apikey" },
  ),
);

export const ApikeyWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              configId: t.String(),
              name: t.String(),
              start: t.String(),
              referenceId: t.String(),
              prefix: t.String(),
              key: t.String(),
              refillInterval: t.Integer(),
              refillAmount: t.Integer(),
              lastRefillAt: t.Date(),
              enabled: t.Boolean(),
              rateLimitEnabled: t.Boolean(),
              rateLimitTimeWindow: t.Integer(),
              rateLimitMax: t.Integer(),
              requestCount: t.Integer(),
              remaining: t.Integer(),
              lastRequest: t.Date(),
              expiresAt: t.Date(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
              permissions: t.String(),
              metadata: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Apikey" },
);

export const ApikeySelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      configId: t.Boolean(),
      name: t.Boolean(),
      start: t.Boolean(),
      referenceId: t.Boolean(),
      prefix: t.Boolean(),
      key: t.Boolean(),
      refillInterval: t.Boolean(),
      refillAmount: t.Boolean(),
      lastRefillAt: t.Boolean(),
      enabled: t.Boolean(),
      rateLimitEnabled: t.Boolean(),
      rateLimitTimeWindow: t.Boolean(),
      rateLimitMax: t.Boolean(),
      requestCount: t.Boolean(),
      remaining: t.Boolean(),
      lastRequest: t.Boolean(),
      expiresAt: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      permissions: t.Boolean(),
      metadata: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ApikeyInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const ApikeyOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      configId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      start: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      referenceId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      prefix: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      key: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      refillInterval: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      refillAmount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      lastRefillAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      enabled: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      rateLimitEnabled: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      rateLimitTimeWindow: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      rateLimitMax: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      requestCount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      remaining: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      lastRequest: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      expiresAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      permissions: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      metadata: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Apikey = t.Composite([ApikeyPlain, ApikeyRelations], {
  additionalProperties: false,
});

export const ApikeyInputCreate = t.Composite(
  [ApikeyPlainInputCreate, ApikeyRelationsInputCreate],
  { additionalProperties: false },
);

export const ApikeyInputUpdate = t.Composite(
  [ApikeyPlainInputUpdate, ApikeyRelationsInputUpdate],
  { additionalProperties: false },
);
