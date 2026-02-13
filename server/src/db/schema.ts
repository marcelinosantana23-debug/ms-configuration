import { pgTable, text, varchar, timestamp, boolean, integer, jsonb, uuid, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Tabela de Administradores (Donos do Sistema)
export const admins = pgTable('admins', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  supportWhatsapp: varchar('support_whatsapp', { length: 20 }),
  masterPassword: varchar('master_password', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tabela de Clientes (Mecânicos com Acesso)
export const clients = pgTable('clients', {
  id: uuid('id').primaryKey().defaultRandom(),
  adminId: uuid('admin_id').notNull().references(() => admins.id, { onDelete: 'cascade' }),
  clientId: varchar('client_id', { length: 50 }).unique().notNull(), // ID único do cliente
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }),
  phone: varchar('phone', { length: 20 }),
  businessName: varchar('business_name', { length: 255 }), // Nome da oficina
  isActive: boolean('is_active').default(true).notNull(),
  deviceFingerprint: varchar('device_fingerprint', { length: 255 }), // Identificação única do dispositivo
  lastAccessAt: timestamp('last_access_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  clientIdIdx: uniqueIndex('client_id_idx').on(table.clientId),
  adminIdIdx: uniqueIndex('admin_id_idx').on(table.adminId),
}));

// Tabela de Sessões de Usuário
export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  token: varchar('token', { length: 500 }).unique().notNull(),
  deviceFingerprint: varchar('device_fingerprint', { length: 255 }).notNull(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tabela de Manuais de Motos
export const manuals = pgTable('manuals', {
  id: uuid('id').primaryKey().defaultRandom(),
  brand: varchar('brand', { length: 100 }).notNull(),
  model: varchar('model', { length: 100 }).notNull(),
  year: varchar('year', { length: 20 }).notNull(),
  displacement: varchar('displacement', { length: 20 }).notNull(),
  engineType: varchar('engine_type', { length: 100 }),
  maxPower: varchar('max_power', { length: 50 }),
  maxTorque: varchar('max_torque', { length: 50 }),
  fuelType: varchar('fuel_type', { length: 50 }),
  
  // Especificações em JSON
  engineOil: jsonb('engine_oil'),
  transmissionOil: jsonb('transmission_oil'),
  brakeFluid: jsonb('brake_fluid'),
  coolant: jsonb('coolant'),
  
  // Regulagens
  valveAdjustment: jsonb('valve_adjustment'),
  sparkPlug: jsonb('spark_plug'),
  chain: jsonb('chain'),
  
  // Pneus e Freios
  tires: jsonb('tires'),
  brakes: jsonb('brakes'),
  
  // Capacidades
  fuelCapacity: varchar('fuel_capacity', { length: 50 }),
  
  // Tabela de Torques
  torqueValues: jsonb('torque_values'),
  
  // Procedimentos
  procedures: jsonb('procedures'),
  
  // Diagnóstico
  commonIssues: jsonb('common_issues'),
  
  // Peças de Reposição
  replacementParts: jsonb('replacement_parts'),
  
  // Metadata
  externalManualUrl: text('external_manual_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tabela de Favoritos do Cliente
export const favorites = pgTable('favorites', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  manualId: uuid('manual_id').notNull().references(() => manuals.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Tabela de Registros de Serviços
export const serviceRecords = pgTable('service_records', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
  manualId: uuid('manual_id').references(() => manuals.id, { onDelete: 'set null' }),
  description: text('description').notNull(),
  value: integer('value').notNull(), // Valor em centavos
  date: timestamp('date').notNull(),
  status: varchar('status', { length: 20 }).notNull(), // 'Pago' ou 'Pendente'
  paymentMethod: varchar('payment_method', { length: 20 }), // 'Dinheiro', 'Pix', 'Cartão'
  monthYear: varchar('month_year', { length: 7 }).notNull(), // 'YYYY-MM'
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Tabela de Logs de Acesso
export const accessLogs = pgTable('access_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  clientId: uuid('client_id').references(() => clients.id, { onDelete: 'set null' }),
  action: varchar('action', { length: 100 }).notNull(), // 'login', 'view_manual', 'create_service', etc
  resourceId: varchar('resource_id', { length: 255 }), // ID do recurso acessado
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  success: boolean('success').default(true).notNull(),
  errorMessage: text('error_message'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relações
export const adminsRelations = relations(admins, ({ many }) => ({
  clients: many(clients),
}));

export const clientsRelations = relations(clients, ({ one, many }) => ({
  admin: one(admins, {
    fields: [clients.adminId],
    references: [admins.id],
  }),
  sessions: many(sessions),
  favorites: many(favorites),
  serviceRecords: many(serviceRecords),
  accessLogs: many(accessLogs),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  client: one(clients, {
    fields: [sessions.clientId],
    references: [clients.id],
  }),
}));

export const manualsRelations = relations(manuals, ({ many }) => ({
  favorites: many(favorites),
  serviceRecords: many(serviceRecords),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  client: one(clients, {
    fields: [favorites.clientId],
    references: [clients.id],
  }),
  manual: one(manuals, {
    fields: [favorites.manualId],
    references: [manuals.id],
  }),
}));

export const serviceRecordsRelations = relations(serviceRecords, ({ one }) => ({
  client: one(clients, {
    fields: [serviceRecords.clientId],
    references: [clients.id],
  }),
  manual: one(manuals, {
    fields: [serviceRecords.manualId],
    references: [manuals.id],
  }),
}));

export const accessLogsRelations = relations(accessLogs, ({ one }) => ({
  client: one(clients, {
    fields: [accessLogs.clientId],
    references: [clients.id],
  }),
}));
