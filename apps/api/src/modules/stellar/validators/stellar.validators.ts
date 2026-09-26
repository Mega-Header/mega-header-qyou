export { linkWalletSchema, unlinkWalletSchema } from '@mega-header-qyou/shared';
import type { z } from 'zod';
import type { linkWalletSchema, unlinkWalletSchema } from '@mega-header-qyou/shared';

export type LinkWalletInputType = z.infer<typeof linkWalletSchema>;
export type UnlinkWalletInputType = z.infer<typeof unlinkWalletSchema>;
