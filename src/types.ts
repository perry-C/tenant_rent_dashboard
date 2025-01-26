import z from 'zod';

import {
    createInvoiceSchema,
    invoiceItemSchema,
    tenantCreationSchema,
} from '@/lib/validationSchemas';
import { MouseEventHandler } from 'react';
export type InvoiceType = z.infer<typeof createInvoiceSchema>;
export type InvoiceItemType = z.infer<typeof invoiceItemSchema>;
export type MouseHTMLEvent = MouseEventHandler<HTMLElement> | undefined;
export type TenantCreationSchema = z.infer<typeof tenantCreationSchema>;
