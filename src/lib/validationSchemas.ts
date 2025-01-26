import validator from 'validator';
import { z } from 'zod';

const fieldValidators = {
    first_name: z
        .string()
        .min(1, { message: 'Must be at least 1 characters' })
        .max(50, { message: 'Must be at most 50 characters' }),
    last_name: z
        .string()
        .min(1, { message: 'Must be at least 1 characters' })
        .max(50, { message: 'Must be at most 50 characters' }),
    nationality: z
        .string()
        .min(1, { message: 'Must be at least 1 characters' })
        .max(50, { message: 'Must be at most 50 characters' }),
    telephone: z
        .string()
        .min(1, { message: 'Must be at least 1 characters' })
        .max(50, { message: 'Must be at most 50 characters' })
        .refine(
            validator.isMobilePhone,
            'The phone number format must be valids'
        ),
    flat_number: z
        .string()
        .min(1, { message: 'Must be at least 1 number' })
        .max(4, { message: 'Must be at most 4 numbers' }),
    room_number: z
        .string()
        .min(1, { message: 'Must be exactly 1 character' })
        .max(1, { message: 'Must be exactly 1 character' }),
    contract_id: z
        .string()
        .min(1, { message: 'Must be at least 1 characters' })
        .max(50, { message: 'Must be at most 50 characters' }),
    tenant_id: z
        .string()
        .min(1, { message: 'Must be at least 1 characters' })
        .max(50, { message: 'Must be at most 50 characters' }),
    tenancy_length: z
        .number()
        .int()
        .positive({ message: 'Must be a positive integer' }),
    total_amount_in_words: z
        .string()
        .min(1, { message: 'Must be at least 1 characters' })
        .max(50, { message: 'Must be at most 50 characters' }),

    non_negative_number: z.coerce.number().nonnegative({
        message: 'Must be a positive number',
    }),
    date_string: z.string().date(),

    optional_date: z.date().optional(),
};

export const tenantCreationSchema = z.object({
    first_name: fieldValidators.first_name,
    last_name: fieldValidators.last_name,
    nationality: fieldValidators.nationality,
    tel: fieldValidators.telephone,

    // Provided the tenant has a contract
    flat_number: fieldValidators.flat_number,
    room_number: fieldValidators.room_number,
    move_in_date: fieldValidators.date_string,
    move_out_date: fieldValidators.date_string,
    tenancy_length: fieldValidators.non_negative_number,
    deposit_amount: fieldValidators.non_negative_number,
    monthly_rent: fieldValidators.non_negative_number,
    eac_bill_deposit: fieldValidators.non_negative_number,
    water_bill_deposit: fieldValidators.non_negative_number,
});

const invoiceSenderSchema = z.object({
    first_name: fieldValidators.first_name,
    last_name: fieldValidators.last_name,
});

const invoiceReceiverSchema = z.object({
    first_name: fieldValidators.first_name,
    last_name: fieldValidators.last_name,
    flat_number: fieldValidators.flat_number,
    room_number: fieldValidators.room_number,
});

export const invoiceItemSchema = z.object({
    payment_amount: fieldValidators.non_negative_number,
    payment_type: z.string(),
    due_date: fieldValidators.optional_date,
});

const invoiceDetailsSchema = z.object({
    create_date: fieldValidators.date_string,
    due_date: fieldValidators.date_string,
    contract_id: fieldValidators.contract_id,
    tenant_id: fieldValidators.tenant_id,
    invoice_items: z.array(invoiceItemSchema).optional(),
    total_amount: fieldValidators.non_negative_number,
    total_amount_in_words: fieldValidators.total_amount_in_words,
});

export const createInvoiceSchema = z.object({
    sender: invoiceSenderSchema,
    receiver: invoiceReceiverSchema,
    details: invoiceDetailsSchema,
});
